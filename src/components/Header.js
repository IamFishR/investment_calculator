import logo from '../assets/logo.png'
const Header = (props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <img src={logo} className="w-32" alt="Logo"/>
            <h1 className="text-2xl font-medium text-slate-600">Investment Calculator</h1>
        </div> 
    )
};

export {
    Header
}