import { NextRequest, NextResponse } from "next/server";
import countryToCurrency, { Countries } from "country-to-currency";
import { premiumPriceUSD } from "@/src/core/data/constants";

const getCurrencyFromCountry = (countryCode: Countries) => {
  return countryToCurrency[countryCode]
    ? countryToCurrency[countryCode]
    : "USD";
};
const getClientIp = (req: NextRequest) => {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  console.log({ xForwardedFor });

  // If the header contains multiple IPs, return the first one
  if (xForwardedFor) {
    
    return xForwardedFor.split(",")[0].trim();
  }

  // Fallback to X-Real-IP if available
  console.log({ real:req.headers.get("x-real-ip") });

  return req.headers.get("x-real-ip");
};

export async function GET(req: NextRequest) {
  try {
    let country;
    console.log({geo:req.geo})

    if (!req.geo) {
      const ip = getClientIp(req);
      const geoUrl = `https://ipinfo.io/${ip}?token=${process.env.ipinfo_token}`;
      const res = await fetch(geoUrl);
      const data = await res.json();
      country = data.country as string;
    console.log({ip})

    }

    country = req.geo!.country as Countries;
    console.log({geo:req.geo})
    const currency = getCurrencyFromCountry(country).toLocaleUpperCase();
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`,
      { next: { revalidate: 3600 } }
    );

    const d = await response.json();
    let baseprice = Number(d.rates[currency]);
    if (isNaN(baseprice)) {
      baseprice = 1;
    }
    const price = baseprice * premiumPriceUSD;
    console.log({
      dd: d.rates[currency.toLocaleUpperCase()],
      cc: currency,
      country,
    });
    return NextResponse.json([{ price, currency }, null]);
  } catch (error: any) {
    return NextResponse.json([null, error.message]);
  }
}
