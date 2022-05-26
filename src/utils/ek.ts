function ek(s: string, ekler: string) {
  ekler = ekler.replace(/\s/g, "");
  let eklerArr: Array<string> = ekler.split(",");
  let cogulMu: boolean = false;
  let kesmeIsareti = false;
  let ozelIsimMi = false;
  let yabanciMi = false;

  const metin_dizisi = s.split("|");

  if (!(typeof metin_dizisi[1] === "undefined")) {
    if (metin_dizisi[1] === "y") {
      yabanciMi = true;
    }
  }

  s = metin_dizisi[0];

  eklerArr = ekleriSirala(eklerArr);

  if (/^[A-Z]/.test(s)) {
    s = s.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    ozelIsimMi = true;
  }

  for (let i = 0; i < eklerArr.length; i++) {
    if (eklerArr[i] === "lar" || eklerArr[i] === "ler") {
      s = _ler(s, ozelIsimMi);
      cogulMu = true;
    }
    if (eklerArr[i] === "ın" || eklerArr[i] === "in" || eklerArr[i] === "un" || eklerArr[i] === "ün") {
      s = _in(s, ozelIsimMi, yabanciMi);
    }
    if (eklerArr[i] === "a" || eklerArr[i] === "e" || eklerArr[i] === "u" || eklerArr[i] === "ü") {
      s = _e(s, ozelIsimMi, yabanciMi);
    }
    if (eklerArr[i] === "ı" || eklerArr[i] === "i" || eklerArr[i] === "u" || eklerArr[i] === "ü") {
      s = _i(s, ozelIsimMi, yabanciMi);
    }
    if (
      eklerArr[i] === "da" ||
      eklerArr[i] === "de" ||
      eklerArr[i] === "ta" ||
      eklerArr[i] === "te" ||
      eklerArr[i] === "dan" ||
      eklerArr[i] === "den" ||
      eklerArr[i] === "tan" ||
      eklerArr[i] === "ten"
    ) {
      s = _de_den(s, eklerArr[i], ozelIsimMi);
    }
  }

  return s;

  function _ler(s: string, ozelIsimMi: boolean) {
    // Çokluk (Çoğul) Eki (-lar / -ler)

    if (ozelIsimMi && !kesmeIsareti) {
      s = ozelIsim(s, true);
      kesmeIsareti = true;
    }

    if (
      s.match(/[aıou]$|[aıou][bcçdfgğhjklmnprsştvwxyz']$|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz]$/i)
    ) {
      s += "lar";
    }
    if (
      s.match(/[eiöü]$|[eiöü][bcçdfgğhjklmnprsştvwxyz']$|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz]$/i)
    ) {
      s += "ler";
    }

    return s;
  }

  function _in(s: string, ozelIsimMi: boolean, yabanciMi: boolean) {
    // İlgi (Tamlama) Ekleri (-ın / -in / -un / -ün)
    if (s === "ben") {
      return "benim";
    } // Özel Kural
    if (s === "biz") {
      return "bizim";
    } // Özel Kural
    if (s.match(/.*[aeoueıiöü]$/i)) {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      }
      s += "n";
    } else {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      } else if (!ozelIsimMi && !yabanciMi) {
        s = unsuzYumusamasi(s);
      }
    }
    if (s.match(/[aı].$|[aı][bcçdfgğhjklmnprsştvwxyz'].$|[aı][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "ın";
    }
    if (s.match(/[ei].$|[ei][bcçdfgğhjklmnprsştvwxyz'].$|[ei][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "in";
    }
    if (s.match(/[ou].$|[ou][bcçdfgğhjklmnprsştvwxyz'].$|[ou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "un";
    }
    if (s.match(/[öü].$|[öü][bcçdfgğhjklmnprsştvwxyz'].$|[öü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "ün";
    }

    return s;
  }

  // Yönelme durumu eki:(-e / -a)
  function _e(s: string, ozelIsimMi: boolean, yabanciMi: boolean) {
    if (s.match(/.*[aeoueıiöü]$/i)) {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      }
      s += "y";
    } else {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      } else if (!ozelIsimMi && !yabanciMi) {
        s = unsuzYumusamasi(s);
      }
    }
    if (
      s.match(
        /(?=.*[aıou].$)|(?=.*[aıou]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz'].$)|(?=.*[aıou]...$)(?=.*[bcçdfgğhjklmnprsştvwxyz]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz].$)/i
      )
    ) {
      s += "a";
    }
    if (
      s.match(
        /(?=.*[eiöü].$)|(?=.*[eiöü]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz'].$)|(?=.*[eiöü]...$)(?=.*[bcçdfgğhjklmnprsştvwxyz]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz].$)/i
      )
    ) {
      s += "e";
    }

    return s;
  }

  // Belirtme durumu eki (-i / -ı / -u / -ü)
  function _i(s: string, ozelIsimMi: boolean, yabanciMi: boolean) {
    if (s.match(/.*[aeoueıiöü]$/i)) {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      }
      s += "y";
    } else {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      } else if (!ozelIsimMi && !yabanciMi) {
        s = unsuzYumusamasi(s);
      }
    }
    if (s.match(/[aı].$|[aı][bcçdfgğhjklmnprsştvwxyz'].$|[aı][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "ı";
    }
    if (s.match(/[ei].$|[ei][bcçdfgğhjklmnprsştvwxyz'].$|[ei][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "i";
    }
    if (s.match(/[ou].$|[ou][bcçdfgğhjklmnprsştvwxyz'].$|[ou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "u";
    }
    if (s.match(/[öü].$|[öü][bcçdfgğhjklmnprsştvwxyz'].$|[öü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
      s += "ü";
    }

    return s;
  }

  // Bulunma durumu eki: (-de / -da / -te / -ta) / Ayrılma (Çıkma) durumu eki: (-den / -dan / -ten / -tan)
  function _de_den(s: string, ek: string, ozelIsimMi: boolean) {
    if (s.match(/.*[çfhksştp]$/i)) {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      }
      s += "t";
    } else {
      if (ozelIsimMi && !cogulMu && !kesmeIsareti) {
        s = ozelIsim(s);
        kesmeIsareti = true;
      }
      s += "d";
    }
    if (
      s.match(
        /[aıou].$|[aıou][bcçdfgğhjklmnprsştvwxyz'].$|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$/i
      )
    ) {
      s += "a";
    } else if (
      s.match(
        /[eiöü].$|[eiöü][bcçdfgğhjklmnprsştvwxyz'].$|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$/i
      )
    ) {
      s += "e";
    }

    if (ek === "dan" || ek === "den" || ek === "tan" || ek === "ten") {
      return s + "n";
    } else {
      return s;
    }
  }

  function ozelIsim(ozelIsim: string, cogulMu?: boolean) {
    if (!cogulMu) {
      ozelIsim += "'";
    }
    return ozelIsim;
  }

  function ekleriSirala(eklerArr: Array<string>) {
    const tempArray = [];

    for (let i = 0; i < eklerArr.length; i++) {
      if (eklerArr[i] === "ler" || eklerArr[i] === "lar") {
        tempArray.push(eklerArr[i]);
        eklerArr.splice(i, 1);
      }
    }
    for (let i = 0; i < eklerArr.length; i++) {
      if (eklerArr[i] === "in" || eklerArr[i] === "ın") {
        tempArray.push(eklerArr[i]);
        eklerArr.splice(i, 1);
      }
    }

    return [...tempArray, ...eklerArr];
  }

  function unsuzYumusamasi(s: string) {
    s = s.replace(/[ç]$/i, "c");
    s = s.replace(/[p]$/i, "b");
    s = s.replace(/[t]$/i, "d");
    if (s.match(/[aeıioöuü][k]$/i)) {
      s = s.replace(/k$/, "ğ");
    } else if (s.match(/[bcçdfgğhjklmnprsştvwxyz][k]$/i)) {
      s = s.replace(/k$/, "g");
    }
    return s;
  }
}

export default ek;
