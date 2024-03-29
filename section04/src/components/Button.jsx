import "./Button.css"
// eslint-disable-next-line react/prop-types
const Button = ({text, type, onClick}) => {

    return (
            <button onClick={onClick}
                    className={`Button Button_${type}`}>
                {text}
            </button>
    );
};

export default Button;