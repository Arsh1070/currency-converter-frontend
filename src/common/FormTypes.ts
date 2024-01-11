export interface InputTypeSelectProps {
  options: any;
  defaultValue: any;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  filterOption: (value: string) => void | boolean;
  showSearch: boolean;
  size: string;
  placeholder: string;
}

export interface InputTypeNumberProps {
  onChange: (value: string) => void;
  size: string;
  placeholder: string;
  min: number;
  max: number;
  controls: boolean;
}

export interface convertedResult {
  selectedCurrency:
    | {
        id: string;
        name: string;
        unit?: string;
        type?: string;
      }
    | undefined;
  selectedCoin: any;
  amount: number;
  exchangeRate: number;
}
