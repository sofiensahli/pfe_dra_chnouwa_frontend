export class Consultation {

  id: number
  titre: string
  date_publication
  date_ouverture
  numero_demande_achat: string
  numero_comission: string
  file: File
  peice_jointes: Array<PieceJointe>

  constructor( ) {
    this.peice_jointes = new Array()
  }
}

interface PieceJointe {
  path: string
  id: number
}
