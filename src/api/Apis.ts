import { apiConfig } from '../config/apiConfig';
import apiClient from '../utils/apiClient';

export const getCoinsList = async (search?: string) => {
  const payload = { ...apiConfig.GET_COINS_LIST };
  if (search && search.length) {
    payload.url += `?search=${search}`;
    const result = await apiClient(payload);
    return result;
  } else {
    const result = await apiClient(payload);
    return result;
  }
};

export const getConvertedResult = async (paramsData: any) => {
  const { amount, coinId, targetCurrency } = paramsData;
  const payload = { ...apiConfig.GET_EXCHANGE_PRICE };
  payload.url += `?amount=${amount}&coinId=${coinId}&targetCurrency=${targetCurrency}`;
  const result = await apiClient(payload);
  return result;
};
