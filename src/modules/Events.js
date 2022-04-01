import React, { useEffect, useState } from 'react';

export default function Home ({
    auth,
    authToken
}) { 
    const [elements, setElements] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [locationCEP, setLocationCEP] = useState("")
    const [locationCountry, setLocationCountry] = useState("")
    const [locationState, setLocationState] = useState("")
    const [locationDistrict, setLocationDistrict] = useState("")
    const [locationStreet, setLocationStreet] = useState("")
    const [locationNumber, setLocationNumber] = useState("")
    const [locationComplement, setLocationComplement] = useState("")
    const [locationInfo, setLocationInfo] = useState("")
    const [paymentMode, setPaymentMode] = useState("")

    useEffect(() => {
        readData()
    }, [])

    async function readData(){
        const read = await fetch("https://minhastack-api.herokuapp.com/events", {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        });

        let returnData = await read.json();
        setElements(returnData.data);
    }

    async function createOpportunity(){
        const create = await fetch("https://minhastack-api.herokuapp.com/events", {
            method: 'POST',
            headers: {
                'Authorization': authToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                locationCEP,
                locationCountry,
                locationState,
                locationDistrict,
                locationStreet,
                locationNumber,
                locationComplement,
                locationInfo,
                paymentMode
            })
        });
        
        readData()
    }
    
    return (
        <div>
            {dialogOpen ? (
                <div className="container light insight-basic-padding">
                    <div className="insight">Novo evento</div>

                    <div className="input">
                        <div className="label">Nome</div>
                        <input type="text" onChange={(e)=>{setName(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Descrição</div>
                        <input type="text" onChange={(e)=>{setDescription(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">País</div>
                        <input type="text" onChange={(e)=>{setLocationCountry(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Estado</div>
                        <input type="text" onChange={(e)=>{setLocationState(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Bairro</div>
                        <input type="text" onChange={(e)=>{setLocationDistrict(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Rua</div>
                        <input type="text" onChange={(e)=>{setLocationStreet(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Complemento</div>
                        <input type="text" onChange={(e)=>{setLocationComplement(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Informações adicionais</div>
                        <input type="text" onChange={(e)=>{setLocationInfo(e.target.value)}} className="textInput" />
                    </div>
                    <div className="input">
                        <div className="label">Forma de pagamento</div>
                        <input type="text" onChange={(e)=>{setPaymentMode(e.target.value)}} className="textInput" />
                    </div>

                    <br />
                    <div className="button-light sm white" onClick={() => {createOpportunity()}}>Criar</div>
                </div>
            ) : null }
            <div className="container insight-basic-padding">
                <div className="button-light sm" onClick={() => {setDialogOpen(!dialogOpen)}}>Adicionar eventos</div>
                <div className="insight">Eventos</div>
                <div className="insight-bigger">Registre seus eventos</div>
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
                        <div>
                            <b>Forma de pagamento</b><br />
                            {item.paymentMode}
                        </div>
                        <div>
                            <b>Localização</b><br />
                            {item.locationCEP}
                            {item.locationCountry}
                            {item.locationState}
                            {item.locationDistrict}
                            {item.locationStreet}
                            {item.locationComplement}
                        </div>
                        <div>
                            <b>Informações adicionais</b><br />
                            {item.locationInfo}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}