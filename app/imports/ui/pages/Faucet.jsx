import React from 'react';
import { withRouter } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

class Faucet extends React.Component{

    constructor(props){
        super(props);
        this.state = {captchaKey:null,
                      toAddr:''};
    }

    componentWillMount(){
        this.setState({
  
        });
    };

    handleAddrChange (e) {
        this.setState({
            toAddr: e.target.value
        });

    };

    route (link) {
        this.props.history.push(link)
    };

    request () {

        let toAddr = this.state.toAddr;

        let isAddr = Web3Util.isAddress(toAddr);
        console.log(toAddr)
        if(!toAddr || !isAddr) {

            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                title: '',
                message: 'Not a valid MIX address.',
                target: '_blank'
            },{
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                type:'danger',
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });

        } else if (!this.state.captchaKey) {

            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                title: '',
                message: 'Please complete the captcha below.',
                target: '_blank'
            },{
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                type:'danger',
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });

        } else {

            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                title: '',
                message: 'Requesting MIX...',
                target: '_blank'
            },{
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                type:'info',
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });

            SessionUtil.requestMixFromFaucet(toAddr, this.state.captchaKey).then(response =>{

            });

        }


    };

    onChange(_captchaKey) {
       console.log(_captchaKey)
        this.setState({
            captchaKey:_captchaKey
        })


    }


    render() {
        let Render;

        Render = 
        <div style ={{margin:'auto', maxWidth:'1200px'}}>
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                    <div className="w3-container w3-padding">
                        <div style={{paddingBottom: "20px"}}>
                            <h3 style={{paddingBottom: "20px"}} >MIX Faucet</h3>
                    
                            <div  style={{paddingBottom: "10px"}}>
                                <span>This is service to allow you to aquire a small amount of MIX to get your account started.  It can only be used once per account and IP. Please consider donating to keep the faucet funded.</span>
                                <div className="form-group">
                                        <label htmlFor="addr" style={{fontWeight: "bold"}}>Enter a MIX Address:</label>
                                    <input onChange={this.handleAddrChange.bind(this)} style={{width:"80%"}} className="form-control" id="addr" placeholder="0x43b32a..." type="text"/>
                                </div>
                            </div>
                            <div  style={{paddingBottom: "20px"}}>
                                <button onClick= {this.request.bind(this)} id="request" type="button" className="btn btn-light"><i className=""></i> &nbsp;Request MIX</button>&nbsp;&nbsp;&nbsp;
                                <a  target="_blank" href="https://graviex.net/markets/mixbtc">Need more?</a>
                            </div>
                                <ReCAPTCHA
                                    sitekey="6Ld3npIUAAAAAN3xMe83rYHUy0wkgGXajOU6f9OM"
                                    onChange={this.onChange.bind(this)}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    


    
        return(Render);
    };

}

export default withRouter(Faucet);