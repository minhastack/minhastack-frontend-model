import React, { useEffect, useState } from 'react';

export default function Home ({
    auth,
    authToken
}) { 
    const [elements, setElements] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)

    const [nomeDoProduto, setNomeDoProduto] = useState("")
    const [valorCobrado, setValorCobrado] = useState("")
    const [valorPago, setValorPago] = useState("")
    const [nomeDoCliente, setNomeDoCliente] = useState("")

    useEffect(() => {
        readData()
    }, [])

    async function readData(){
        const read = await fetch("https://minhastack-api.herokuapp.com/vendas", {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        });

        let returnData = await read.json();
        setElements(returnData.data);
    }

    async function createOpportunity(){
        const create = await fetch("https://minhastack-api.herokuapp.com/vendas", {
            method: 'POST',
            headers: {
                'Authorization': authToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeDoProduto,
                valorCobrado,
                valorPago,
                nomeDoCliente
            })
        });
        
        readData()
    }
    
    return (
        <div>
            {dialogOpen ? (
                <div className="container light insight-basic-padding">
                    <div className="insight">Nova venda</div>

                    <div className="input">
                        <div className="label">Nome do produto</div>
                        <input type="text" onChange={(e)=>{setNomeDoProduto(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Valor Cobrado</div>
                        <input type="text" onChange={(e)=>{setValorCobrado(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Valor Pago</div>
                        <input type="text" onChange={(e)=>{setValorPago(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Nome do Cliente</div>
                        <input type="text" onChange={(e)=>{setNomeDoCliente(e.target.value)}} className="textInput" />
                    </div>

                    <br />
                    <div className="button-light sm white" onClick={() => {createOpportunity()}}>Criar</div>
                </div>
            ) : null }
            <div className="container insight-basic-padding">
                <div className="button-light sm" onClick={() => {setDialogOpen(!dialogOpen)}}>Adicionar venda</div>
                <div className="insight">Vendas</div>
                <div className="insight-bigger">Registre suas vendas</div>
            </div>
            <div className="container insight-basic-padding">
                {elements.map(item => (
                    <div className="box">
                        <div>
                            <b>ID</b><br />
                            {item._id}
                        </div>
                        <div>
                            <b>Nome do Cliente</b><br />
                            {item.nomeDoCliente}
                        </div>
                        <div>
                            <b>Nome do Produto</b><br />
                            {item.nomeDoProduto}
                        </div>
                        <div>
                            <b>Valor Pago</b><br />
                            {item.valorPago}
                        </div>
                        <div>
                            <b>Valor Cobrado</b><br />
                            {item.valorCobrado}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}