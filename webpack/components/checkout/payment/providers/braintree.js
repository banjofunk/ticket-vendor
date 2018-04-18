import { fetchJSON } from 'utils'
import { paymentGatewayTokenPath, paymentGatewayPaymentPath } from 'paths/api'
import braintree from 'braintree-web'


export function sendPayment(ccd, amount, cart)  {
  return fetchJSON(paymentGatewayTokenPath())
    .then(resp => braintree.client.create({ authorization: resp.token }))
    .then( clientInstance => {
      return clientInstance.request({
        endpoint: 'payment_methods/credit_cards',
        method: 'post',
        data: {
          creditCard: {
            cardholderName:ccd.name,
            number: ccd.number,
            expirationDate: ccd.expirationDate,
            cvv: ccd.cvc,
            billingAddress: {
              postalCode: ccd.postal
            }
          }
        }
      })
    })
    .then( resp => {
      const nonce = resp.creditCards[0].nonce
      return fetchJSON(paymentGatewayPaymentPath(), {
        method: 'POST',
        body: JSON.stringify({ nonce, amount, cart })
      })
    })
}
