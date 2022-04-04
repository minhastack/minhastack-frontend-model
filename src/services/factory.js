import serviceConfig from "./config/serviceConfig";

async function readServiceToState({ setStateFn, endpoint }){
    if(!endpoint){
        endpoint = serviceConfig.apiEndpoint;
    }

    const read = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': authToken
        }
    });

    let returnData = await read.json();
    setStateFn(returnData);
}

async function createServiceItem({ setStateFn, endpoint, item, readServiceFn }){
    if(!endpoint){
        endpoint = serviceConfig.apiEndpoint;
    }
    
    const create = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    
    if(readServiceFn) {
        let returnData = await read.json();
        readServiceFn(returnData)
    }
}