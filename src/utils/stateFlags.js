/**
 * Mapeamento de siglas de estados para URLs de bandeiras (Wikimedia Commons).
 * Usadas apenas como textura decorativa com opacidade muito baixa.
 * Se o Wikimedia estiver indisponível, os cards funcionam normalmente sem a bandeira.
 */
const STATE_FLAGS = {
  AC: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bandeira_do_Acre.svg',
  AL: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bandeira_de_Alagoas.svg',
  AP: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Bandeira_do_Amap%C3%A1.svg',
  AM: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bandeira_do_Amazonas.svg',
  BA: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Bandeira_da_Bahia.svg',
  CE: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Bandeira_do_Cear%C3%A1.svg',
  DF: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Bandeira_do_Distrito_Federal_%28Brasil%29.svg',
  ES: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Bandeira_do_Esp%C3%ADrito_Santo.svg',
  GO: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_Goi%C3%A1s.svg',
  MA: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Bandeira_do_Maranh%C3%A3o.svg',
  MT: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Bandeira_de_Mato_Grosso.svg',
  MS: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Bandeira_de_Mato_Grosso_do_Sul.svg',
  MG: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Bandeira_de_Minas_Gerais.svg',
  PA: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Bandeira_do_Par%C3%A1.svg',
  PB: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Bandeira_da_Para%C3%ADba.svg',
  PR: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Bandeira_do_Paran%C3%A1.svg',
  PE: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Bandeira_de_Pernambuco.svg',
  PI: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Bandeira_do_Piau%C3%AD.svg',
  RJ: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Bandeira_do_estado_do_Rio_de_Janeiro.svg',
  RN: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Bandeira_do_Rio_Grande_do_Norte.svg',
  RS: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Bandeira_do_Rio_Grande_do_Sul.svg',
  RO: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Bandeira_de_Rond%C3%B4nia.svg',
  RR: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bandeira_de_Roraima.svg',
  SC: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bandeira_de_Santa_Catarina.svg',
  SP: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg',
  SE: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bandeira_de_Sergipe.svg',
  TO: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Bandeira_do_Tocantins.svg',
};

export const getStateFlag = (sigla) => STATE_FLAGS[sigla?.toUpperCase()] || null;
