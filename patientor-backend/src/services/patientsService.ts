import patientsData from '../../data/patients.json';
import { Patient, PatientInfo } from '../types';

const patients : Array<Patient> = patientsData;

const getPatients = (): Array<PatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
      return { id, name,dateOfBirth, gender, occupation };
    });
  };

  export default {
    getPatients
  };
