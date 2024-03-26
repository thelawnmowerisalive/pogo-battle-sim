class Strategy {

  autotap = true;
  autoThrowCharged = true;

  shields: 'always' | 'if more than 10%' = 'always';
}

export default Strategy;