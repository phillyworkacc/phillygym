import { redirectUnauthorized } from '@/helpers/redirects';
import ProteinGoalForm from './ProteinGoalForm';

export default async function ProteinGoal () {
   await redirectUnauthorized();
   return <ProteinGoalForm />;
}
