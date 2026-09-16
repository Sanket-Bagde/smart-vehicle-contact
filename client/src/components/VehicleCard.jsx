function VehicleCard(props){
    return(
        <div>
            <h2>{props.owner}</h2>
            <h2>{props.brand}</h2>
            <p>{props.number}</p>
        </div>
    );
}

export default VehicleCard;
