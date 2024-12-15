import { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

export default function Home(){
    const {allCoin, currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');
    function inputHandler(event){
        setInput(event.target.value);
        if(event.target.value === ""){
            setDisplayCoin(allCoin);
        }
    }
    const searchHandler = async (event)=>{
        event.preventDefault();
        const coins = await allCoin.filter((item) => {
           return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins);
    }
    useEffect(() =>{
        setDisplayCoin(allCoin)
    },[allCoin])
    return (
        <div className='home'>
            <div className="hero">
                <h1>Largest <br /> Crypto Marketplace</h1>
                <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore about cryptos. </p>
                <form action="" onSubmit={searchHandler}>
                    <input type="text" list="coinlist" placeholder='Search crypto...' value={input} onChange={inputHandler} required/>

                    <datalist id='coinlist'>
                        {allCoin.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </datalist>

                    <button type='submit'>Search</button>
                </form>      
            </div>
            <div className='crypto-table'>
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{textAlign:"center"}}>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0,10).map((item,index)=>(
                        <Link to={`/coin/${item.id}`} key={index} className="table-layout">
                            <p>{item.market_cap_rank}</p>
                            <div>
                                <img src={item.image} alt="" />
                                <p>{item.name + " - " + item.symbol}</p>
                            </div>
                            <p>{currency.symbol} {item.current_price}</p>
                            <p className={item.price_change_percentage_24h?"green": "red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}