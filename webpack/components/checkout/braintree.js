import { fetchJSON } from 'utils'
import { paymentGatewayTokenPath, paymentGatewayPaymentPath } from 'utils/apiPaths'
import braintree from 'braintree-web'

export const sendPayment = (ccd) =>  {
  return fetchJSON(paymentGatewayTokenPath())
    .then(resp => braintree.client.create({ authorization: resp.token }))
    .then(clientInstance => clientInstance.request({
        endpoint: 'payment_methods/credit_cards',
        method: 'post',
        data: {
          creditCard: {
            cardholderName:ccd.cardHolderName,
            number: ccd.ccdNumber,
            expirationDate: ccd.expirationDate,
            cvv: ccd.cvvNumber,
            billingAddress: {
              postalCode: ccd.postalCode
            }
          }
        }
      })
    )
    .then((resp) => {
      const nonce = resp.creditCards[0].nonce
      // const amount = ccd.amount
      const amount = "2.00"

      return fetchJSON(paymentGatewayPaymentPath(), {
        method: 'POST',
        body: JSON.stringify({ nonce, amount })
      })
    })
}
