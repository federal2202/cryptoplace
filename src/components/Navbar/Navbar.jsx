import './Navbar.css'

import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

export default function Navbar(){
    const {setCurrency} = useContext(CoinContext);
    function currencyHandler(event){
        switch(event.target.value){
            case "usd": {
                setCurrency({name: "usd", symbol: "$"});
                break;
            }
            case "euro" : {
                setCurrency({name: "eur", symbol: "€"});
                break;
            }
            case "inr" : {
                setCurrency({name: "inr", symbol: "₹"});
                break;
            }
            default : {
                setCurrency({name: "usd", symbol: "$"});
                break;
            }
        }
    }
    return (
        <div className='navbar'>
            <Link to={'/'}>
                <img src={logo} alt="" className='logo'/>
            </Link>
            
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <li>Features</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
            <div className="nav-right">
                <select name="" id="" onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="euro">EURO</option>
                    <option value="inr">INR</option>
                </select>
                <button>Sign up <img src={arrow_icon} alt="" /></button>
            </div>
        </div>
    )
}