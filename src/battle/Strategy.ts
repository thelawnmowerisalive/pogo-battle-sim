class Strategy {

  autotap = true;
  autoThrowCharged = true;

  shields: 'always' | 'if more than 10%' | 'never' = 'always';
}

export default Strategy;