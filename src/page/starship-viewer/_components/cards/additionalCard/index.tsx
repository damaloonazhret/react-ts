import { TWorld } from '../../../../../api/requests/swapi/homeworld/_types.ts';

type TProps = {
  additionalInfo: TWorld;
};

export const AdditionalCard = ({ additionalInfo }: TProps) => {
  return (
    <>
      <h2>Planet Info</h2>
      <ul>
        <li>name: {additionalInfo.name}</li>
        <li>rotation_period: {additionalInfo.rotation_period}</li>
        <li>orbital_period: {additionalInfo.orbital_period}</li>
        <li>diameter: {additionalInfo.diameter}</li>
        <li>climate: {additionalInfo.climate}</li>
        <li>gravity: {additionalInfo.gravity}</li>
        <li>terrain: {additionalInfo.terrain}</li>
        <li>surface_water: {additionalInfo.surface_water}</li>
      </ul>
    </>
  );
};
