import { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from '../../context/AuthProvider';

function CheckoutForm(props) {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { setPaidAuth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: process.env.REACT_APP_CLIENT_URL + '/pdfOrVideoView'
            },
            redirect: 'if_required'
        });

        if (error) {
            if (error.message === "Your card's expiration date is in the past.") {
                toast.error('カードの有効期限が過ぎています。');
            }
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                const myConfirmData = props.confirmData;

                const response = await axios.post(process.env.REACT_APP_API_URL + '/payForReadDoc', myConfirmData);

                myConfirmData.id = response.data.data;

                var tmp = props.paidUserIdx;
                tmp.push(myConfirmData.user_id);

                setCookieOfReqUser({
                    auth: true,
                    value: tmp
                });

                navigate('/pdfOrVideoView');
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            }

        } else {
            alert('Unexpected status');
        }

        setIsProcessing(false);
    }

    const setCookieOfReqUser = (cookieInfo) => {
        setPaidAuth(cookieInfo);
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement />

            <button disabled={isProcessing} id="submit" className="btn btn-primary mt-3 w-100">
                <span id="button-text">
                    {
                        isProcessing ? "Processing ..." : "Pay now"
                    }
                </span>
            </button>
        </form>
    )
}

export default CheckoutForm;