
import axios from "axios";
import React, { Component } from "react";
import http from "../../services/httpServices";
import auth from '../../services/authService';

import { Link } from 'react-router-dom';
import { formatNumber, formatDate, compareDates, getMonthsLeft } from '../validate/validate';

class DepositHistory extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      isLoading:true,
      error:'',
      emptyData:''
    };
    this.style={height:'50vh',background:"gray"}
  }

  componentWillMount() {
    const user= auth.getCurrentUser()
    const url = `${http.setURL()}/savings-investments/individual-investments/${user.email}`
    const getData= async()=>{

      try {
        const response = await axios.get(url,http.setJwtHeaders());
        if(response && Array.isArray(response.data.message)){
          this.setState({data:response.data});
        }else{
          this.setState({emptyData:response.data.message});
          this.setState({data:null})
        }
        this.setState({error:''});
        this.setState({isLoading:false})
      } catch (error) {
        if(error.message==='Network Error'){
          this.setState({error:"Please check your network connection"});
        }else{
          this.setState({error:error.response.data})
        }
        this.setState({isLoading:false});
        this.setState({data:null})
      }
    }
    getData()
  }

  render() {
    const { data,emptyData,error,isLoading} = this.state;
   const handleCancel=()=>{
      localStorage.removeItem('break-account')
    }
    return (
      <>
      {isLoading?<div  style={this.style}><span className="loader" style={{position:'relative', top:'50%',left:"50%", display:'block'}}></span></div>:
      <div className="row justify-content-center pt-3">
        <div className='col-md-10 col-sm-12'>
          <div className="card p-5 shadow border-0">
            <div className="card-header">
              <h3 className='text-center'>INVESTMENTs</h3>
            </div>
            <div className="card-body shadow-lg">         
          <table className="table table-bordered table-striped table-responsive table-condensed">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Amount(&#8358;)</th>
                <th>Interest(&#8358;)</th>
                <th>Rate(%)</th>
                <th>Paid Date</th>
                <th>Due Date</th>
                <th>Month(s) Left</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {(error || emptyData) &&<tr ><td colSpan='9' className='text-center text-danger'>{error} {emptyData} </td></tr>}
             {data &&data.message.map((result,index)=>(
              <tr key={result.id }>
                <td>{index +1}</td>
                <td>{formatNumber(result.investmentAmount)}</td>
                <td>{formatNumber(result.actualInterest)}</td>
                <td>{result.interestRate}</td>
                <td>{formatDate(result.createdAt)}</td>
                <td>{formatDate(result.liquidatedDate)}</td>
                <td>{getMonthsLeft(result.investmentDuration)}</td>
                <td>
                  {result.status===true?"Locked":"Opened"}
                  {compareDates(result.liquidatedDate)===true?
                    <Link className='btn btn-sm btn-bg'
                    onClick={handleCancel}
                    to={`/withdrawals/${result.id}`}>Withdraw</Link>
                  :<Link className='btn btn-warning btn-sm' to={`/break/${result.id}?status=break!`}>Break?</Link>}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
            </div>
          </div>
          </div>
        </div>}
      </>
    );
  }
}

export default DepositHistory;