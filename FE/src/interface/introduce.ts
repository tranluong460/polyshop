export interface IIntroduce {
  title: string;
  label: string;
  text: string;
  order: boolean;
  description: IDescriptionIntroduce[];
}

export interface IDescriptionIntroduce {
  label: string;
  letter: string;
}
