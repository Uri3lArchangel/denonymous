export async function getSolToNgnRate(): Promise<number> {
  const url = 'https://min-api.cryptocompare.com/data/price?fsym=SOL&tsyms=NGN';

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Return the SOL to NGN conversion rate
    console.log({NGN:data.NGN})
    return data.NGN;

  } catch (error) {
    console.error('Error fetching Sol to NGN conversion rate:', error);
    throw new Error('Could not fetch conversion rate');
  }
}
