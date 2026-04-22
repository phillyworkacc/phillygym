import { redirectUnauthorized } from '@/helpers/redirects';
import MaintenanceCaloriesForm from './MaintenanceCaloriesForm';

export default async function BMICalculator () {
   await redirectUnauthorized();
   return <MaintenanceCaloriesForm />;
}
