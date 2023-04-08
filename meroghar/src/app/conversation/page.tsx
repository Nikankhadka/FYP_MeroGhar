import AlertC from "../../components/modals/alert";
import Cmodal from "../../components/modals/confirmModal";

export default function Users(){
    return(
        <main>
            will conversation on click will be redirected to actual messaging WishlistPage

            //or could setup conditionally rendering component of message similar to linkeding
            <Cmodal />
            <AlertC type="info" message="hello world" />
        </main>
    )
}