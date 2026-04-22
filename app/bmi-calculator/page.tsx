import { redirectUnauthorized } from '@/helpers/redirects'
import BmiCalculatorForm from './BmiCalculatorForm';

export default async function BMICalculator () {
   await redirectUnauthorized();
   return <BmiCalculatorForm />;
}
