const prettyPrice = (amount: number, decimal = false) => `$${(amount / 100).toFixed(decimal ? 2 : 0)}`

export default prettyPrice
