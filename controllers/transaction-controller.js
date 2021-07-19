const mockTransactions = [
    {name: 'Veggies', value: '500', type: 'outcome'},
    {name: 'lawn the mown', value: '1000', type: 'income'},
]

// get all transactions
// route: GET base_url/api/v1/transactions
exports.getTransactions = (req, res, next) => {
    res.status(200).json({message: 'Hit route GET for getting transactions', data: mockTransactions})
}