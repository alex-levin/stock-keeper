## React components
cd ~/Projects/stocks-app/micro-services/client
npx create-react-app .
npm install @material-ui/core
npm install @material-ui/icons
npm install react-router-dom
npm install axios

https://help.quandl.com/category/338-api-usage

Anonymous users have a limit of 20 calls per 10 minutes and 50 calls per day.
Authenticated users have a limit of 300 calls per 10 seconds, 2,000 calls per 10 minutes and a limit of 50,000 calls per day. 

https://www.quandl.com/api/v3/datasets/EOD/AAPL?start_date=2016-01-01&end_date=2016-01-31&api_key=YOURAPIKEY

https://www.quandl.com/api/v3/datasets/EOD/MSFT?start_date=2020-01-01&end_date=2020-05-31&api_key=3Ge74JbsqSvHPzPzygNa
https://www.quandl.com/api/v3/datasets/EOD/BA?start_date=2020-01-01&end_date=2020-05-31&api_key=3Ge74JbsqSvHPzPzygNa
https://www.quandl.com/api/v3/datasets/EOD/GD?start_date=2020-01-01&end_date=2020-01-31&api_key=3Ge74JbsqSvHPzPzygNa


https://www.quandl.com/api/v3/datatables/WIKI/PRICES?start_date=2020-01-01&end_date=2020-05-31&ticker=AAPL&api_key=3Ge74JbsqSvHPzPzygNa

https://docs.quandl.com/docs/in-depth-usage#get-filtered-time-series-data

curl "https://www.quandl.com/api/v3/datasets/WIKI/GD.json?column_index=4&start_date=2020-01-01&end_date=2020-06-01&collapse=monthly&transform=rdiff&api_key=3Ge74JbsqSvHPzPzygNa"

{"dataset":{"id":9775708,"dataset_code":"GD","database_code":"WIKI","name":"General Dynamics Corp. (GD) Prices, Dividends, Splits and Trading Volume","description":"End of day open, high, low, close and volume, dividends and splits, and split/dividend adjusted open, high, low close and volume for General Dynamics Corporation (GD). Ex-Dividend is non-zero on ex-dividend dates. Split Ratio is 1 on non-split dates. Adjusted prices are calculated per CRSP (www.crsp.com/products/documentation/crsp-calculations)\n\nThis data is in the public domain. You may copy, distribute, disseminate or include the data in other products for commercial and/or noncommercial purposes.\n\nThis data is part of Quandl's Wiki initiative to get financial data permanently into the public domain. Quandl relies on users like you to flag errors and provide data where data is wrong or missing. Get involved: connect@quandl.com\n","refreshed_at":"2018-03-27T21:46:11.144Z","newest_available_date":"2018-03-27","oldest_available_date":"1977-01-03","column_names":["Date","Close"],"frequency":"daily","type":"Time Series","premium":false,"limit":null,"transform":"rdiff","column_index":4,"start_date":"2020-01-01","end_date":"2018-03-27","data":[],"collapse":"monthly","order":null,"database_id":4922}}


brp3dtnrh5rdpcuje930

import requests
r = requests.get('https://finnhub.io/api/v1/covid19/us?token=brp3dtnrh5rdpcuje930')
print(r.json())

https://unsplash.com/s/photos/stock-market?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

from pandas_datareader.data as web
df = web.DataReader('AAPL', 'yahoo', '2019-05-01', '2019-11-17')
>>> print(df)
                  High         Low        Open       Close      Volume   Adj Close
Date
2019-05-01  215.309998  209.229996  209.880005  210.520004  64827300.0  207.239120
2019-05-02  212.649994  208.130005  209.839996  209.149994  31996300.0  205.890457
2019-05-03  211.839996  210.229996  210.889999  211.750000  20892400.0  208.449951
2019-05-06  208.839996  203.500000  204.289993  208.479996  32443100.0  205.230911
2019-05-07  207.419998  200.830002  205.880005  202.860001  38763700.0  199.698502
...                ...         ...         ...         ...         ...         ...
2019-11-11  262.470001  258.279999  258.299988  262.200012  20455300.0  260.873016
2019-11-12  262.790009  260.920013  261.549988  261.959991  21847200.0  260.634216
2019-11-13  264.779999  261.070007  261.130005  264.470001  25683600.0  263.131531
2019-11-14  264.880005  262.100006  263.750000  262.640015  22295700.0  261.310791
2019-11-15  265.779999  263.010010  263.679993  265.760010  25051600.0  264.415009

pip install yfinance
https://github.com/ranaroussi/yfinance

>>> import yfinance as yf
>>> msft = yf.Ticker("MSFT")
>>> print(msft.info)
{'zip': '98052', 'sector': 'Technology', 'fullTimeEmployees': 144000, 'longBusinessSummary': 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its Productivity and Business Processes segment offers Office, Exchange, SharePoint, Microsoft Teams, Office 365 Security and Compliance, and Skype for Business, as well as related Client Access Licenses (CAL); Skype, Outlook.com, and OneDrive; LinkedIn that includes Talent and marketing solutions, and subscriptions; and Dynamics 365, a set of cloud-based and on-premises business solutions for small and medium businesses, large organizations, and divisions of enterprises. Its Intelligent Cloud segment licenses SQL and Windows Servers, Visual Studio, System Center, and related CALs; GitHub that provides a collaboration platform and code hosting service for developers; and Azure, a cloud platform. It also provides support services and Microsoft consulting services to assist customers in developing, deploying, and managing Microsoft server and desktop solutions; and training and certification to developers and IT professionals on various Microsoft products. Its More Personal Computing segment offers Windows OEM licensing and other non-volume licensing of the Windows operating system; Windows Commercial, such as volume licensing of the Windows operating system, Windows cloud services, and other Windows commercial offerings; patent licensing; Windows Internet of Things; and MSN advertising. It also provides Microsoft Surface, PC accessories, and other intelligent devices; Gaming, including Xbox hardware, and Xbox software and services; video games and third-party video game royalties; and Search, including Bing and Microsoft advertising. It sells its products through distributors and resellers; and directly through digital marketplaces, online stores, and retail stores. It has strategic partnerships with Humana Inc., Nokia, Telkomsel, Swiss Re, Kubota Corporation, and FedEx Corp. The company was founded in 1975 and is headquartered in Redmond, Washington.', 'city': 'Redmond', 'phone': '425-882-8080', 'state': 'WA', 'country': 'United States', 'companyOfficers': [], 'website': 'http://www.microsoft.com', 'maxAge': 1, 'address1': 'One Microsoft Way', 'fax': '425-706-7329', 'industry': 'Software—Infrastructure', 'previousClose': 200.57, 'regularMarketOpen': 202.09, 'twoHundredDayAverage': 169.652, 'trailingAnnualDividendYield': 0.009921723, 'payoutRatio': 0.3233, 'volume24Hr': None, 'regularMarketDayHigh': 203.95, 'navPrice': None, 'averageDailyVolume10Day': 33539283, 'totalAssets': None, 'regularMarketPreviousClose': 200.57, 'fiftyDayAverage': 186.09428, 'trailingAnnualDividendRate': 1.99, 'open': 202.09, 'toCurrency': None, 'averageVolume10days': 33539283, 'expireDate': None, 'yield': None, 'algorithm': None, 'dividendRate': 2.04, 'exDividendDate': 1597795200, 'beta': 0.925537, 'circulatingSupply': None, 'startDate': None, 'regularMarketDayLow': 201.425, 'priceHint': 2, 'currency': 'USD', 'trailingPE': 33.927025, 'regularMarketVolume': 18656561, 'lastMarket': None, 'maxSupply': None, 'openInterest': None, 'marketCap': 1544215855104, 'volumeAllCurrencies': None, 'strikePrice': None, 'averageVolume': 42612912, 'priceToSalesTrailing12Months': 11.133576, 'dayLow': 201.425, 'ask': 203.61, 'ytdReturn': None, 'askSize': 900, 'volume': 18656561, 'fiftyTwoWeekHigh': 203.95, 'forwardPE': 32.737946, 'fromCurrency': None, 'fiveYearAvgDividendYield': 1.92, 'fiftyTwoWeekLow': 130.78, 'bid': 203.59, 'tradeable': False, 'dividendYield': 0.010199999, 'bidSize': 900, 'dayHigh': 203.95, 'exchange': 'NMS', 'shortName': 'Microsoft Corporation', 'longName': 'Microsoft Corporation', 'exchangeTimezoneName': 'America/New_York', 'exchangeTimezoneShortName': 'EDT', 'isEsgPopulated': False, 'gmtOffSetMilliseconds': '-14400000', 'quoteType': 'EQUITY', 'symbol': 'MSFT', 'messageBoardId': 'finmb_21835', 'market': 'us_market', 'annualHoldingsTurnover': None, 'enterpriseToRevenue': 10.58, 'beta3Year': None, 'profitMargins': 0.33356997, 'enterpriseToEbitda': 22.895, '52WeekChange': 0.5031853, 'morningStarRiskRating': None, 'forwardEps': 6.22, 'revenueQuarterlyGrowth': None, 'sharesOutstanding': 7583439872, 'fundInceptionDate': None, 'annualReportExpenseRatio': None, 'bookValue': 15.086, 'sharesShort': 40829581, 'sharesPercentSharesOut': 0.0054, 'fundFamily': None, 'lastFiscalYearEnd': 1561852800, 'heldPercentInstitutions': 0.74093, 'netIncomeToCommon': 46265999360, 'trailingEps': 6.002, 'lastDividendValue': None, 'SandP52WeekChange': 0.06871927, 'priceToBook': 13.497613, 'heldPercentInsiders': 0.014249999, 'nextFiscalYearEnd': 1625011200, 'mostRecentQuarter': 1585612800, 'shortRatio': 1.13, 'sharesShortPreviousMonthDate': 1588204800, 'floatShares': 7472267013, 'enterpriseValue': 1467393638400, 'threeYearAverageReturn': None, 'lastSplitDate': 1045526400, 'lastSplitFactor': '2:1', 'legalType': None, 'morningStarOverallRating': None, 'earningsQuarterlyGrowth': 0.221, 'dateShortInterest': 1590710400, 'pegRatio': 2.25, 'lastCapGain': None, 'shortPercentOfFloat': 0.0055, 'sharesShortPriorMonth': 47763253, 'category': None, 'fiveYearAverageReturn': None, 'regularMarketPrice': 202.09, 'logo_url': 'https://logo.clearbit.com/microsoft.com'}
>>> hist = msft.history(period="max")
>>> print(hist)
              Open    High     Low   Close      Volume  Dividends  Stock Splits
Date
1986-03-13    0.06    0.06    0.06    0.06  1031788800        0.0           0.0
1986-03-14    0.06    0.07    0.06    0.06   308160000        0.0           0.0
1986-03-17    0.06    0.07    0.06    0.07   133171200        0.0           0.0
1986-03-18    0.07    0.07    0.06    0.06    67766400        0.0           0.0
1986-03-19    0.06    0.06    0.06    0.06    47894400        0.0           0.0
...            ...     ...     ...     ...         ...        ...           ...
2020-06-17  195.03  196.32  193.69  194.24    25655900        0.0           0.0
2020-06-18  194.00  196.49  194.00  196.32    23061600        0.0           0.0
2020-06-19  198.59  199.29  194.37  195.15    44441100        0.0           0.0
2020-06-22  195.79  200.76  195.23  200.57    32750200        0.0           0.0
2020-06-23  202.09  203.95  201.43  203.62    18684970        0.0           0.0

[8641 rows x 7 columns]
>>>


