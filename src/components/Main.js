import React, {Component} from 'react';
import axios from 'axios'
import './Main.scss'

class Main extends Component {
    constructor(){
        super();
       this.state={
           API_KEY: '687e2ddc19ef4b7895351d36350c2519',
           proxy : 'https://cors-anywhere.herokuapp.com/',
           lat:0,
           lng:0,
           weatherData:{},
           currently:{},
           daily:{},
           hourly:{},
           days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        }
    }

    componentDidMount() {
    axios.get('https://ipapi.co/json/')
        .then(data=>this.setState({
            lat:data.data.latitude,
            lng:data.data.longitude
        }))
        .then(()=>{
            // Remove Proxy before put it Online
            axios(this.state.proxy + `https://api.darksky.net/forecast/687e2ddc19ef4b7895351d36350c2519/${this.state.lat},${this.state.lng}`)
                .then(data=>this.setState({
                    weatherData:data.data,
                    currently:data.data.currently,
                    daily:data.data.daily,
                    hourly:data.data.hourly
                }))
        })
    }

    convertTmp=(e)=>{
        return(
            Math.ceil((e - 32) * 5/9)
        )
    };



    render() {
console.log(this.state.weatherData)
        let tmp = () =>{
            if (this.state.currently.apparentTemperature) {
                let currentTmp = this.convertTmp(this.state.currently.apparentTemperature)
                return(
                    <div>
                        <h1>{currentTmp} &#176;</h1>
                    </div>
                )
            }else {
                return(
                    <div>
                        <h1>Please Waite</h1>
                    </div>
                )
            }
        };

            let summary=()=>{
                if (this.state.currently.summary) {
                    let summary = this.state.currently.summary
                    return(
                        <div>
                            <h2>{summary}</h2>
                        </div>
                    )
                }else {
                    return(
                        <div>
                            <h2>Please Waite</h2>
                        </div>
                    )
                }
            }


            let daily = () =>{

                if (this.state.daily.data) {
                    console.log(typeof this.state.daily.data);
                    this.state.daily.data.map(day=>{
                        console.log(this.state.days[this.state.daily.data.indexOf(day)]);
                        console.log(this.state.daily.data.indexOf(day));
                             if (this.state.daily.data.indexOf(day) <= 6) {
                                 return(

                                     <p>{this.state.days[this.state.daily.data.indexOf(day)]}</p>

                                 )
                             } else {
                                 return(

                                     <p>{this.state.days[ this.state.daily.data.length  - ( this.state.daily.data.indexOf(day) - this.state.daily.data.length  )  ]}</p>

                                 )
                             }

                    })
                }
                else {
                    return(
                        <p>Please Waite</p>
                    )
                }
            }


        let today = () =>{

            let date = new Date()
            let day = this.state.days[date.getDay()]
            return(

                <span>{day}</span>
            )
        }


        return (
            <div className='Main'>

                <p>{today()}</p>
                <p className='info'>Now : 	&nbsp; {tmp()} </p>
                <p className='info'>Summary : 	&nbsp;  {summary()}</p>

                {daily()}

            </div>
        );
    }
}

export default Main;