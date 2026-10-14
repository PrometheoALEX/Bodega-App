function EstadoProducto(props) {
    return (
        <div className="tarjeta">
            <h3>{props.nombre}</h3>
            {props.stock > 0 ? (
                <p style={{ color: "green" }}>✅ Disponible ({props.stock} unidades)</p>
            ) : (
                <p style={{ color: "red" }}>❌ Agotado</p>
            )}
        </div>
    );
}
export default EstadoProducto;