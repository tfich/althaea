type PlatformFees = {
  [platform: string]: {
    percents: number[]
    flatFees: number[]
  }
}

const platformFees: PlatformFees = {
  'PayPal (2.9% + $.30)': {
    percents: [2.9],
    flatFees: [0.3]
  },
  'eBay (10% + 2.9%)': {
    percents: [10, 2.9],
    flatFees: []
  },
  'Goat (9.5% + $5)': {
    percents: [9.5],
    flatFees: [5]
  },
  'Grailed (6% + 2.9%)': {
    percents: [6, 2.9],
    flatFees: []
  },
  'StockX Level 1': {
    percents: [9.5],
    flatFees: []
  },
  'StockX Level 2': {
    percents: [9],
    flatFees: []
  },
  'StockX Level 3': {
    percents: [8.5],
    flatFees: []
  },
  'StockX Level 4': {
    percents: [8],
    flatFees: []
  }
}

export default platformFees
