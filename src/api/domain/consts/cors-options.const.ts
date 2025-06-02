const portfolioOrigins = ['https://vbss.io', 'https://www.vbss.io']
const onlyYesOrigins = ['https://yes.vbss.io', 'https://www.yes.vbss.io']

export const corsOptions = {
  origin: [...portfolioOrigins, ...onlyYesOrigins],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}
