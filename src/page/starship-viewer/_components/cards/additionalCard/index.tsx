import { TWorld } from '../../../../../api/requests/swapi/homeworld/_types.ts';
import classNames from 'classnames/bind';
import style from './index.module.scss';

type TProps = {
  additionalInfo: TWorld;
  handleClose: () => void;
};

const cn = classNames.bind(style);
const BLOCK_NAME = 'AdditionalCard';

export const AdditionalCard = ({ additionalInfo, handleClose }: TProps) => {
  return (
    <>
      <button
        className={cn(`${BLOCK_NAME}__btn`)}
        type="button"
        onClick={handleClose}
      >
        close button
      </button>
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
