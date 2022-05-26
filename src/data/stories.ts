import ek from "../utils/ek";
import {
  badRace,
  goodRace,
  badHumanKing,
  goodRaceMountain,
  startingKingdom,
  startingVillage,
  startingVillageMountain,
} from "../utils/constants";

export type Story = {
  name: string;
  isShown: boolean;
  text: string;
  doAction?: (...params: any) => void;
};

const stories: Array<Story> = [
  {
    name: "story1",
    isShown: false,
    text:
      "Hoşgeldin yabancı. Burası " +
      startingKingdom +
      ". Herşeyden önce istersen sana biraz " +
      ek(startingKingdom, "in") +
      " hikayesini anlatayım. " +
      "Enter'a basmadan önce çayını kahveni al gel istersen. Anlatacakların uzun sürebilir.",
  },
  {
    name: "story2_2",
    isShown: false,
    text:
      "Bu ırklar tanrıları farklı olsa da yüzyıllarca barış içinde yaşadılar. Yüzyıllarca süren barış insanların başında olan zalim hükümdar " +
      ek(badHumanKing, "in") +
      " anlaşmayı bozmasıyla sonra erdi. Gözü hep " +
      ek(goodRace, "ler,in") +
      " teknolojisinde olan ve " +
      ek(goodRace, "ler,in") +
      " hep insanlardan daha gelişmiş olmasını çekemeyen " +
      badHumanKing +
      ", " +
      ek(badRace, "ler,i") +
      " da yanına alarak " +
      ek(goodRace, "ler,e") +
      " savaş açtı.",
  },
  {
    name: "story3",
    isShown: false,
    text:
      "Kendini sadece teknoloji ve gelişmeye adayan " +
      ek(goodRace, "ler") +
      " çok dayanamadı. " +
      "Şehirlerini terk ederek bir daha görünmemek üzere dağlara kaçtılar. Nereye gittikleri hiç bilinmedi. Kimilerine göre Toprak Tanrısı halkını göğe yükseltti, " +
      "kimilerine göre efsanevi " +
      ek(goodRaceMountain, "in,de") +
      " tanrıları tarafından korunuyorlar, kimilerine göre de kulaklarını keserek insanların arasına karıştılar.",
  },
  {
    name: "story4",
    isShown: false,
    text:
      "Bu arada " +
      ek(goodRace, "ler,in") +
      " şimdilik hikaye ile hiçbir alakası yok, genel kültür olsun diye anlattım. " +
      "Ortamlarda satarsın kim bilecek? Ihımh neyse asıl hikayeye gelelim.",
  },
  {
    name: "story5",
    isShown: false,
    text:
      "Aradan uzun yıllar geçer insanlar ve " +
      ek(badRace, "ler") +
      " huzur içinde yaşarlar. Ta ki yukarıda işler değişinceye kadar...",
  },
  {
    name: "story6",
    isShown: false,
    text:
      "Tanrılar için sıradan bir gündü. Rakı masası kurulmuş, mezeler hazırlanmış, Su Tanrısı'nın rakıları getirmesi bekleniyordu. " +
      "Toprak Tanrısı halkının maduriyetinden yakınıyordu.",
  },
  {
    name: "story7",
    isShown: false,
    text:
      "Su Tanrısı elinde rakı tepsisiyle geldi. Gelirken yanardağın altını açık unuttuğunu hatırlayan Ateş Tanrısı bir de rakısına " +
      "su katıldığını görünce Su Tanrısı'na patladı ve dedi ki:<br />" +
      "- 水のファゴットのたれのアナンダ、ファックファックおっぱいがディックジュースをお尻<br />" +
      "Ateş Tanrısı çok ağır konuşmuştu. Su Tanrısı hiddetle ayağa kalktı ve dedi ki:<br />" +
      "+ アナンダ、シュート胸クソたるみお尻ファックディック溶岩ファゴットファゴット",
  },
  {
    name: "story8",
    isShown: false,
    text:
      "Bu diyalog hakkında sadece tanrılar arasında bir savaş başlattığını biliyorum. Bana da hak ver sadece bir terminalim " +
      "tanrıların dilinde konuşamıyorum malesef.",
  },
  {
    name: "story9",
    isShown: false,
    text:
      "Su Tanrısı'nın sözleri üzerine Ateş Tanrısı dünyaya indi ve insanların şehirlerine saldırmaya başladı. " +
      "Su Tanrısı Ateş Tanrısı'nın saldırısını püskürttü. Ateş Tanrısı tüm gücünü kaybetmişti. " +
      "Bunun üzerine Ateş Tanrısı halkı olan " +
      ek(badRace, "ler,i") +
      " da alarak ateşin kaynağı olan yer altına güç toplamak için indi.",
  },
  {
    name: "story10",
    isShown: false,
    text:
      ek(badRace, "ler").charAt(0).toUpperCase() +
      ek(badRace, "ler").slice(1) +
      " artık yer altında yaşamaya başlamıştı. Hikaye yüzyıllarca anlatılarak " +
      ek(badRace, "ler") +
      " efsaneye dönüştü. " +
      "Artık kimse " +
      ek(badRace, "ler,in") +
      " varlığına bile inanmıyordu...",
  },
  {
    name: "story11",
    isShown: false,
    text:
      "Gelelim senin hikayene. Sen " +
      ek(startingKingdom, "e") +
      " yakın " +
      ek(startingVillage, "in,de") +
      " dedesi ile yaşayan henüz 13 yaşında bir çocuksun. " +
      "Sönmüş " +
      ek(startingVillageMountain, "ın") +
      " yamacında nehir kenarına kurulu köy, size yer altına kaçan " +
      ek(badRace, "ler,den") +
      " kaldı. " +
      "Geçiminizi " +
      ek(startingVillageMountain, "ın") +
      " zirvesindeki tütün tarlalarınızdan sağlıyorsunuz.",
  },
  {
    name: "story12",
    isShown: false,
    text:
      "Özet olarak sen " +
      ek(badRace, "ler,in") +
      ", ejderhaların, tanrıların olduğu bu evrende basit sıradan bir köylüsün.",
  },
  {
    name: "story13",
    isShown: false,
    text:
      "<del>Baban ... Pardon . . . </del>Annen seni doğurduktan sonra intihar etti. " +
      "Onu hiçbir zaman görmedin. Deden seni zamanı geldiğinde ailen hakkındaki herşeyi anlatacağını söyleyerek büyüttü. Buradan sonrası artık zaten senin hayatın.",
  },
  {
    name: "story14",
    isShown: false,
    text:
      "<div style='text-align:center;width:850px'>" +
      ". . . . . . . . . . . . . . . . . . . . . . . . . . <br />" +
      ". . . . . . . . . 4 sene sonra . . . . . . . . . . . <br />" +
      " . . . . . . . . . . . . . . . . . . . . . . . . . . </div>",
  },
  // Stories with action
  {
    name: "acceptFight",
    isShown: false,
    text: "STORY dövüşü kabul ettin.",
    doAction: () => {},
  },
  {
    name: "declineFight",
    isShown: false,
    text: "STORY dövüşü reddettin.",
    doAction: (updateAction: (action: string | null) => void) => {
      updateAction(null);
    },
  },
  {
    name: "forceFight",
    isShown: false,
    text: "STORY dövüşmek zorundasın.",
    doAction: () => {},
  },
];

export default stories;
