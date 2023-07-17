// eslint-disable-next-line react/prop-types
function UserInput({ name, type, placeholder, disText, onChage}){
    return (
        <section className="flex flex-col mt-3">
            <label htmlFor={name}>Enter { name }</label>
            <input type={type} placeholder={placeholder} className="border-2 border-gray-200 rounded block mt-1 p-2" onChange={onChage}/>
            <p className="text-sm text-gray-500">{ disText }</p>
        </section>
    );
}

export default UserInput;