import axios from 'axios';
import {convertSingleNumberToTwoDigits} from 'src/utils';

const agentId = 'Guadalupe5433d69c-ac84-11ec-8475-c2bb32e40a46';

const sevenDaysBefore = new Date();

sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);

const formattedDate = `${sevenDaysBefore.getUTCFullYear()}-${convertSingleNumberToTwoDigits(
  sevenDaysBefore.getUTCMonth() + 1
)}-${convertSingleNumberToTwoDigits(sevenDaysBefore.getUTCDate())}`;

const today = `${new Date().getUTCFullYear()}-${convertSingleNumberToTwoDigits(
  new Date().getUTCMonth() + 1
)}-${convertSingleNumberToTwoDigits(new Date().getUTCDate())}`;

export const getRatingsData = async (
  limit: number = 2,
  next?: string,
  from: string = formattedDate,
  to: string = today,
  rating?: string
) => {
  let url;
  if (rating && rating.length !== 0) {
    url = `https://us-central1-ccaas-untangl.cloudfunctions.net/ratings?agent=${agentId}&rating=${rating}`;
  } else if (next && next?.length !== 0) {
    url = `https://us-central1-ccaas-untangl.cloudfunctions.net/ratings?limit=${limit}&from=${agentId}-${from}&to=${agentId}-${to}&next=${next}`;
  } else {
    url = `https://us-central1-ccaas-untangl.cloudfunctions.net/ratings?limit=${limit}&from=${agentId}-${from}&to=${agentId}-${to}`;
  }

  const response = await axios.get(url);

  return response.data.ratings;
};
