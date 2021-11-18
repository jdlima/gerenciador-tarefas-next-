// estudo react.js


import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'

const MeuComponenteDeFuncao = (props:any) => {
  return <h1>{props.texto}</h1>
}

class MeuComponenteDeClasse extends React.Component{

    state = {
        msg : 'Meu primeiro componente de classe'
    }

    componentDidMount(){
      setTimeout(() => {
        this.setState({msg : 'Mudei o state'});
      }, 2000);
    }

    render(){
      return <h2>{this.state.msg}</h2>
    }
} 

const Teste: NextPage = () => {

  const [lista,setLista] = useState([23,55,89]);

  useEffect(() =>{
    setTimeout(() => {
      console.log('effect');
      setLista([55,89,23,44,65,78]);
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      {lista.map(item => <MeuComponenteDeFuncao texto={item}/>)}
      <MeuComponenteDeClasse/>
      <MeuComponenteDeClasse/>
      <MeuComponenteDeClasse/>
    </div>
  )
}

export default Teste