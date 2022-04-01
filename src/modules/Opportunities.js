import React, { useEffect, useState } from 'react';

export default function Home ({
    auth,
    authToken
}) { 
    const [elements, setElements] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)

    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [location, setLocation] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [payment, setPayment] = useState("")

    useEffect(() => {
        readData()
    }, [])

    async function readData(){
        const read = await fetch("https://minhastack-api.herokuapp.com/opportunities", {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        });

        let returnData = await read.json();
        setElements(returnData.data);
    }

    async function createOpportunity(){
        const create = await fetch("https://minhastack-api.herokuapp.com/opportunities", {
            method: 'POST',
            headers: {
                'Authorization': authToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                type,
                link,
                location,
                state,
                country,
                payment
            })
        });
        
        readData()
    }
    
    return (
        <div>
            {dialogOpen ? (
                <div className="container light insight-basic-padding">
                    <div className="insight">Nova oportunidade</div>

                    <div className="input">
                        <div className="label">Tipo</div>
                        <input type="text" onChange={(e)=>{setType(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Nome</div>
                        <input type="text" onChange={(e)=>{setName(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Descrição</div>
                        <input type="text" onChange={(e)=>{setDescription(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Link</div>
                        <input type="text" onChange={(e)=>{setLink(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Localização</div>
                        <input type="text" onChange={(e)=>{setLocation(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">País</div>
                        <input type="text" onChange={(e)=>{setCountry(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Estado</div>
                        <input type="text" onChange={(e)=>{setState(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Pagamento</div>
                        <input type="text" onChange={(e)=>{setPayment(e.target.value)}} className="textInput" />
                    </div>

                    <br />
                    <div className="button-light sm white" onClick={() => {createOpportunity()}}>Criar</div>
                </div>
            ) : null }
            <div className="container insight-basic-padding">
                <div className="button-light sm" onClick={() => {setDialogOpen(!dialogOpen)}}>Adicionar oportunidade</div>
                <div className="insight">Oportunidades</div>
                <div className="insight-bigger">Descubra editais, vagas e serviços</div>
            </div>
            <div className="container insight-basic-padding">
                {elements.map(item => (
                    <div className="box">
                        <div>
                            <b>ID</b><br />
                            {item._id}
                        </div>
                        <div>
                            <b>Nome</b><br />
                            {item.name}
                        </div>
                        <div>
                            <b>Descrição</b><br />
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}