import FormMusic from "components/Features/Formnusic/FormMusic";
import StyledButton from "components/UI/Button/Button";
import Input from "components/UI/Input/Input";
import { Formik } from "formik";

const MusicAdd = ()=>{
    return (
        <div className="MusicAdd">
            <div className="MusicAdd__form">
              <FormMusic />
            </div>
        </div>
    )
}

export default MusicAdd