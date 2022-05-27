import ek from "../utils/ek";
import {
  badRace,
  goodRace,
  badHumanKing,
  goodRaceMountain,
  startingKingdom,
  startingVillage,
  startingVillageMountain
} from "../utils/constants";

export type Story = {
  name: string;
  hasShown: boolean;
  text: string;
  textSpeed?: number;
  action?: (...params: any) => void;
};

const stories: Array<Story> = [
  {
    name: "story1",
    hasShown: false,
    text: `Hoşgeldin yabancı. Burası ${startingKingdom}. Herşeyden önce istersen sana biraz ${ek(
      startingKingdom,
      "in"
    )} hikayesini anlatayım. Enter'a basmadan önce çayını kahveni al gel istersen. Anlatacakların uzun sürebilir.`
  },
  {
    name: "story2",
    hasShown: false,
    text: `Bu ırklar tanrıları farklı olsa da yüzyıllarca barış içinde yaşadılar. Yüzyıllarca süren barış insanların başında olan zalim hükümdar ${ek(
      badHumanKing,
      "in"
    )} anlaşmayı bozmasıyla sonra erdi. Gözü hep ${ek(goodRace, "ler,in")} teknolojisinde olan ve ${ek(
      goodRace,
      "ler,in"
    )} hep insanlardan daha gelişmiş olmasını çekemeyen ${badHumanKing} ${ek(badRace, "ler,i")} da yanına alarak ${ek(
      goodRace,
      "ler,e"
    )} savaş açtı.`
  },
  {
    name: "story3",
    hasShown: false,
    text: `Kendini sadece teknoloji ve gelişmeye adayan ${ek(
      goodRace,
      "ler"
    )} çok dayanamadı. Şehirlerini terk ederek bir daha görünmemek üzere dağlara kaçtılar. Nereye gittikleri hiç bilinmedi. Kimilerine göre Toprak Tanrısı halkını göğe yükseltti, kimilerine göre efsanevi ${ek(
      goodRaceMountain,
      "in,de"
    )} tanrıları tarafından korunuyorlar, kimilerine göre de kulaklarını keserek insanların arasına karıştılar.`
  },
  {
    name: "story4",
    hasShown: false,
    text: `Bu arada ${ek(
      goodRace,
      "ler,in"
    )} şimdilik hikaye ile hiçbir alakası yok, genel kültür olsun diye anlattım. Ortamlarda satarsın kim bilecek? Ihımh neyse asıl hikayeye gelelim.`
  },
  {
    name: "story5",
    hasShown: false,
    text: `Aradan uzun yıllar geçer insanlar ve ${ek(
      badRace,
      "ler"
    )} huzur içinde yaşarlar. Ta ki yukarıda işler değişinceye kadar...`
  },
  {
    name: "story6",
    hasShown: false,
    text: `Tanrılar için sıradan bir gündü. Rakı masası kurulmuş, mezeler hazırlanmış, Su Tanrısı'nın rakıları getirmesi bekleniyordu. Toprak Tanrısı halkının maduriyetinden yakınıyordu.`
  },
  {
    name: "story7",
    hasShown: false,
    text: `Su Tanrısı elinde rakı tepsisiyle geldi. Gelirken yanardağın altını açık unuttuğunu hatırlayan Ateş Tanrısı bir de rakısına su katıldığını görünce Su Tanrısı'na patladı ve dedi ki:\n- 井の中の蛙、大海を知らず\nAteş Tanrısı çok ağır konuşmuştu. Su Tanrısı hiddetle ayağa kalktı ve dedi ki:\n+ 自業自得. 郷に入っては郷に従え`
  },
  {
    name: "story8",
    hasShown: false,
    text: `Bu diyalog hakkında sadece tanrılar arasında bir savaş başlattığını biliyorum. Bana da hak ver sadece bir terminalim tanrıların dilinde konuşamıyorum malesef.`
  },
  {
    name: "story9",
    hasShown: false,
    text: `Su Tanrısı'nın sözleri üzerine Ateş Tanrısı dünyaya indi ve insanların şehirlerine saldırmaya başladı. Su Tanrısı Ateş Tanrısı'nın saldırısını püskürttü. Ateş Tanrısı tüm gücünü kaybetmişti. Bunun üzerine Ateş Tanrısı halkı olan ${ek(
      badRace,
      "ler,i"
    )} da alarak ateşin kaynağı olan yer altına güç toplamak için indi.`
  },
  {
    name: "story10",
    hasShown: false,
    text: `${ek(badRace, "ler")} ${ek(badRace, "ler").slice(
      1
    )} artık yer altında yaşamaya başlamıştı. Hikaye yüzyıllarca anlatılarak ${ek(
      badRace,
      "ler"
    )} efsaneye dönüştü. Artık kimse ${ek(badRace, "ler,in")} varlığına bile inanmıyordu...`
  },
  {
    name: "story11",
    hasShown: false,
    text: `Gelelim senin hikayene. Sen ${ek(startingKingdom, "e")} yakın ${ek(
      startingVillage,
      "in,de"
    )} dedesi ile yaşayan henüz 13 yaşında bir çocuksun. Sönmüş ${ek(
      startingVillageMountain,
      "ın"
    )} yamacında nehir kenarına kurulu köy, size yer altına kaçan ${ek(badRace, "ler,den")} kaldı. Geçiminizi ${ek(
      startingVillageMountain,
      "ın"
    )} zirvesindeki tütün tarlalarınızdan sağlıyorsunuz.`
  },
  {
    name: "story12",
    hasShown: false,
    text: `Özet olarak sen ${ek(
      badRace,
      "ler,in"
    )}, ejderhaların, tanrıların olduğu bu evrende basit sıradan bir köylüsün.`
  },
  {
    name: "story13",
    hasShown: false,
    text: `Baban... Pardon . . . Annen seni doğurduktan sonra intihar etti. Onu hiçbir zaman görmedin. Deden seni zamanı geldiğinde ailen hakkındaki herşeyi anlatacağını söyleyerek büyüttü. Buradan sonrası artık zaten senin hayatın.`
  },
  {
    name: "story14",
    hasShown: false,
    text: `. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\n. . . . . . . . . . . . . . . . . . . . . 4 sene sonra . . . . . . . . . . . . . . . . . . . . . . .\n. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .`,
    textSpeed: 1000
  },
  // Stories with action
  {
    name: "acceptFight",
    hasShown: false,
    text: "STORY dövüşü kabul ettin.",
    action: () => {}
  },
  {
    name: "declineFight",
    hasShown: false,
    text: "STORY dövüşü reddettin.",
    action: (updateAction: (action: string | null) => void) => {
      updateAction(null);
    }
  },
  {
    name: "forceFight",
    hasShown: false,
    text: "STORY dövüşmek zorundasın.",
    action: () => {}
  }
];

export default stories;
