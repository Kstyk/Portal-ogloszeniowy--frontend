const voivodeships = [
  { value: "dolnośląskie", label: "dolnośląskie" },
  { value: "kujawskoPomorskie", label: "kujawsko-pomorskie" },
  { value: "lubelskie", label: "lubelskie" },
  { value: "lubuskie", label: "lubuskie" },
  { value: "łódzkie", label: "łódzkie" },
  { value: "małopolskie", label: "małopolskie" },
  { value: "mazowieckie", label: "mazowieckie" },
  { value: "opolskie", label: "opolskie" },
  { value: "podkarpackie", label: "podkarpackie" },
  { value: "podlaskie", label: "podlaskie" },
  { value: "pomorskie", label: "pomorskie" },
  { value: "śląskie", label: "śląskie" },
  { value: "świętokrzyskie", label: "świętokrzyskie" },
  { value: "warmińskoMazurskie", label: "warmińsko-mazurskie" },
  { value: "wielkopolskie", label: "wielkopolskie" },
  { value: "zachodnioPomorskie", label: "zachodnio-pomorskie" },
];

export default voivodeships;

export const selectedVoivodeship = (value) => {
  const obj = voivodeships.find((voi) => voi.value === value);

  return obj?.label;
};
