import RazorCheckout from "../components/RazorCheckout";

const RazorPayment = () => {
    return (<>
        <div className="container p-5 text-center mt-5 pt-5">
            <h4>Complete your purchase</h4>
            <div className="col-md-8 offset-md-2">
                <RazorCheckout />
            </div>
        </div>
    </>
    )
}
export default RazorPayment;