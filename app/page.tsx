"use client";
import Image from "next/image";
import nextConfig from "../next.config.mjs";

const BASE_PATH = nextConfig.basePath || "";

import React, { useEffect, useState } from "react";

export default function Home() {
  interface MusicData {
    title: string;
    info: string;
    filename: string;
  }

  const initialData: MusicData[] = [
    {
      title:
        "埴生の宿(はにゅうのやどもわがやどたまのよそいうらやまじ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "埴生の宿",
    },
    {
      title: "同期の桜(おまえとおれとはどうきのさくら 軍歌・戦時歌謡)",
      info: "軍歌・戦時歌謡",
      filename: "同期の桜",
    },
    {
      title: "ラジオ体操の歌(藤山一郎 童謡・唱歌)",
      info: "",
      filename: "ラジオ体操の歌",
    },
    {
      title:
        "嗚呼玉杯に花うけて(一高寮歌 ああぎょくはいにはなうけてりょくしゅにつきのかげやどし 軍歌・戦時歌謡)",
      info: "戦時歌謡",
      filename: "嗚呼玉杯に",
    },
    {
      title: "クシコス・ポスト(ネッケ 運動会 クラシック Csikos Post)",
      info: "ネッケ作曲 クラシック 運動会 Csikos Post",
      filename: "クシコスポスト",
    },
    {
      title: "冬のソナタ(最初から今まで 冬ソナ NHK 韓国ドラマ テレビ)",
      info: "NHK 韓国ドラマ",
      filename: "冬のソナタ",
    },
    {
      title: "叱られて(しかられてあのこはまちまでおつかいに 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "叱られて",
    },
    {
      title: "学生時代(つたのからまるちゃぺるで 歌謡曲 ペギー葉山)",
      info: "ペギー葉山",
      filename: "学生時代",
    },
    {
      title: "この道(このみちはいつかきたみち 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "この道",
    },
    {
      title:
        "子鹿のバンビ(こじかのばんびはかわいいなおはながにおうはるのあさ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "子鹿のバンビ",
    },
    {
      title:
        "さらば涙と言おう(さよならはだれにいうさよならはかなしみに 森田健作 歌謡曲)",
      info: "",
      filename: "さらば涙と言おう",
    },
    {
      title: "アブラハムの子(あぶらはむにはしちにんのこ 童謡・唱歌 洋楽)",
      info: "童謡・唱歌",
      filename: "アブラハムの子",
    },
    {
      title:
        "かっこう(かっこうかっこうどこかでなつをよぶもりのこえ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "かっこう",
    },
    {
      title: "森の小人(もりのこかげでどんじゃらほい 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "森の小人",
    },
    {
      title: "君が代(きみがよはちよにやちよに 国歌)",
      info: "国歌",
      filename: "君が代",
    },
    {
      title: "おうま(おうまのおやこはなかよしこよし 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "おうま",
    },
    {
      title: "金魚の昼寝(あかいべべきたかわいいきんぎょ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "金魚の昼寝",
    },
    {
      title: "案山子(やまだのなかのいっぽんあしのかかし 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "案山子",
    },
    {
      title: "つき(でたでたつきが 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "つき",
    },
    {
      title:
        "月の沙漠(つきのさばくをはるばるとたびのらくだがゆきました 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "月の沙漠",
    },
    {
      title: "あんたがたどこさ(ひごさひごどこさくまもとさ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "あんたがたどこさ",
    },
    {
      title: "山の音楽家(わたしゃおんがくかやまのこりす 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "山の音楽家",
    },
    {
      title:
        "山のロザリア(やまのむすめろざりあいつもひとりうたうよ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "山のロザリア",
    },
    {
      title: "森の水車(みどりのもりのかなたから 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "森の水車",
    },
    {
      title: "ローレライ(なじかはしらねどこころわびて Lorelei 童謡・唱歌 洋楽)",
      info: "童謡・唱歌",
      filename: "ローレライ",
    },
    {
      title: "椰子の実(やしのみ。なもしらぬとおきしまより 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "椰子の実",
    },
    {
      title:
        "早春賦(はるはなのみのかぜのさむさやたにのうぐいすうたはおもえど 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "早春賦",
    },
    {
      title: "かなりや(うたをわすれたかなりやは 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "かなりや",
    },
    {
      title: "鎌倉(しちりがはまのいそづたい 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "鎌倉",
    },
    {
      title: "くつがなる(おててつないでのみちをゆけば 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "くつがなる",
    },
    {
      title:
        "TOMORROW(トゥモロー。なみだのかずだけつよくなれるよ 岡本真夜 JPOP 歌謡曲)",
      info: "JPOP",
      filename: "tomorrow",
    },
    {
      title: "一週間(にちようびにいちばにでかけ ロシア)",
      info: "ロシア",
      filename: "一週間",
    },
    {
      title: "かえるの合唱(かえるのうたがきこえてくるよ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "かえるの合唱",
    },
    {
      title: "アマリリス(みんなできこうたのしいオルゴールを 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "アマリリス",
    },
    {
      title: "ステンカ・ラージン(くおんにとどろくゔぉるがのながれ ロシア)",
      info: "ロシア",
      filename: "ステンカ・ラージン",
    },
    {
      title: "さくら(さくらさくらやよいのそらはみわたすかぎり 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "さくら",
    },
    {
      title:
        "待ちぼうけ(まちぼうけあるひせっせとのらかせぎそこへうさぎがとんででて 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "待ちぼうけ",
    },
    {
      title:
        "夕焼け小焼け(ゆうやけこやけでひがくれてやまのおてらのかねがなる 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "夕焼け小焼け",
    },
    {
      title:
        "宇宙戦艦ヤマト(さらばちきゅうよたびだつふねはうちゅうせんかんやまと アニメ)",
      info: "アニメ",
      filename: "宇宙戦艦ヤマト",
    },
    {
      title: "スキーの歌(かがやくひのかげはゆるのやま 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "スキーの歌",
    },
    {
      title: "スキー(やまはしろがねあさひをあびて 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "スキー",
    },
    {
      title: "げんこつやまのたぬきさん(童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "げんこつやま",
    },
    {
      title:
        "山寺の和尚さん(やまでらのおしょうさんがまりはけりたしまりはなし 童謡・唱歌。服部良一)",
      info: "童謡・唱歌。服部良一",
      filename: "山寺の和尚さん",
    },
    {
      title: "雪(ゆきやこんこあられやこんこ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "雪",
    },
    {
      title: "あわてんぼうのサンタクロース(クリスマス 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "あわてんぼうのサンタクロース",
    },
    {
      title: "四季の雨(ふるともみえじはるのあめ 童謡・唱歌。軍歌・戦時歌謡)",
      info: "童謡・唱歌。軍歌・戦時歌謡",
      filename: "四季の雨",
    },
    {
      title: "もろびとこぞりて(クリスマス 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "もろびとこぞりて",
    },
    {
      title: "愛国行進曲(みよとうかいのそらあけて 軍歌・戦時歌謡)",
      info: "軍歌・戦時歌謡",
      filename: "愛国行進曲",
    },
    {
      title:
        "長崎の女(こいのなみだかそてつのはながかぜにこぼれるいしだたみ 歌謡曲)",
      info: "歌謡曲",
      filename: "長崎の女",
    },
    {
      title: "水師営の会見(りょじゅんかいじょうやくなりて 軍歌・戦時歌謡)",
      info: "軍歌・戦時歌謡",
      filename: "水師営の会見",
    },
    {
      title: "出征兵士を送る歌(わがおおきみにめされたる 軍歌・戦時歌謡)",
      info: "軍歌・戦時歌謡",
      filename: "出征兵士を送る歌",
    },
    {
      title:
        "亜麻色の髪の乙女(ヴィレッジ・シンガーズ。あまいろのながいかみをかぜが 歌謡曲。グループ・サウンズ)",
      info: "ヴィレッジ・シンガーズ。歌謡曲。グループ・サウンズ",
      filename: "亜麻色の髪の乙女",
    },
    {
      title: "高校三年生(あかいゆうひがこうしゃをそめて 歌謡曲。舟木一夫)",
      info: "歌謡曲。舟木一夫",
      filename: "高校三年生",
    },
    {
      title:
        "星に願いを(ディズニー。ピノキオ。かがやくほしにこころのゆめを disney 洋楽)",
      info: "disney 洋楽",
      filename: "星に願いを",
    },
    {
      title:
        "樅の木(たんねんばうむ。もみのきもみのきおいやしげれる 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "樅の木",
    },
    {
      title:
        "ズンドコ節(きしゃのまどからてをにぎりおくってくれたひとよりも 軍歌・戦時歌謡。海軍小唄)",
      info: "軍歌・戦時歌謡。海軍小唄",
      filename: "ズンドコ節",
    },
    {
      title:
        "さらばナポリ(Addio a Napoli わかれのときよいざいざさらば 洋楽 イタリア カンツォーネ)",
      info: "洋楽 イタリア カンツォーネ",
      filename: "さらばナポリ",
    },
    {
      title:
        "東京行進曲(むかしこいしいぎんざのやなぎあだなとしまをだれがしろ 歌謡曲)",
      info: "歌謡曲",
      filename: "東京行進曲",
    },
    {
      title: "アイルランドの子守歌(トゥラルーラルラー 洋楽 民謡 こもりうた)",
      info: "洋楽 民謡",
      filename: "アイルランドの子守歌",
    },
    {
      title:
        "この木なんの木(日立。このきなんのききになるきなまえもしらないきですから CMソング)",
      info: "CMソング",
      filename: "この木なんの木",
    },
    {
      title:
        "ホエン・アイ・フォール・イン・ラブ(When I Fall in Love 洋楽 めぐり逢えたら 映画音楽 Celine Dion)",
      info: "洋楽 めぐり逢えたら 映画音楽 Celine Dion",
      filename: "whenifallinlove",
    },
    {
      title:
        "秋の夜半(ウェーバー。あきのよわのみそらすみて クラシック 魔弾の射手 童謡・唱歌)",
      info: "クラシック 魔弾の射手 童謡・唱歌",
      filename: "秋の夜半",
    },
    {
      title:
        "ジョニーが凱旋するとき(When Johnny Comes Marching Home 洋楽 行進曲)",
      info: "洋楽 行進曲",
      filename: "ジョニーが凱旋するとき",
    },
    {
      title: "お富さん(いきなくろべいみこしのまつに 歌謡曲 邦楽)",
      info: "歌謡曲 邦楽",
      filename: "お富さん",
    },
    {
      title:
        "皆の衆(みなのしゅうみなのしゅううれしかったらはらからわらえ 演歌 村田英雄)",
      info: "演歌",
      filename: "皆の衆",
    },
    {
      title:
        "チャンチキおけさ(つきがわびしいろじうらのやたいのさけのほろにがさ 演歌 三波春夫)",
      info: "演歌 三波春夫",
      filename: "ちゃんちきおけさ",
    },
    {
      title: "Jupiter(ホルスト「惑星」よりジュピター「木星」クラシック)",
      info: "クラシック",
      filename: "木星",
    },
    {
      title: "恋は水色(ポール・モーリア 洋楽)",
      info: "洋楽",
      filename: "恋は水色",
    },
    {
      title: "広瀬中佐(とどろくつつおととびくるだんがん 軍歌・戦時歌謡)",
      info: "軍歌・戦時歌謡",
      filename: "広瀬中佐",
    },
    {
      title:
        "チム・チム・チェリー(ディズニー。メリー・ポピンズ。ちむちむにーちむちむにー 洋楽)",
      info: "洋楽",
      filename: "チム・チム・チェリー",
    },
    {
      title:
        "花まつり(ぬるんだみずにはるのひはうかびこぶねははなたばをつんではしる 洋楽 ラテン)",
      info: "洋楽",
      filename: "花まつり",
    },
    {
      title:
        "秋桜(うすべにのこすもすがあきのひのなにげないひだまりにゆれている 歌謡曲 山口百恵)",
      info: "歌謡曲",
      filename: "秋桜",
    },
    {
      title: "オーラ・リー(Aura Lee 洋楽)",
      info: "洋楽",
      filename: "オーラ・リー",
    },
    {
      title:
        "イエスタデイ・ワンス・モア(カーペンターズ。Yesterday Once More 洋楽)",
      info: "洋楽",
      filename: "イエスタデイ・ワンス・モア",
    },
    {
      title:
        "あの丘越えて(やまのまきばのゆうぐれにかりがとんでるただいちわ 歌謡曲 美空ひばり)",
      info: "歌謡曲 美空ひばり",
      filename: "あの丘越えて",
    },
    {
      title:
        "誰よりも君を愛す(だれにもいわれずたがいにちかったかりそめのこいなら 歌謡曲 松尾和子)",
      info: "歌謡曲 松尾和子",
      filename: "誰よりも君を愛す",
    },
    {
      title: "春の唄(らららあかいはなたば 童謡・唱歌 歌謡曲)",
      info: "童謡・唱歌 歌謡曲",
      filename: "春の唄ラララ",
    },
    {
      title: "春の歌(メンデルスゾーン クラシック)",
      info: "クラシック",
      filename: "メンデルスゾーンの春の歌",
    },
    {
      title:
        "春の唄(さくらのはなのさくころはうららうららとひはうらら 童謡・唱歌 歌謡曲)",
      info: "童謡・唱歌 歌謡曲",
      filename: "春の唄さくら",
    },
    {
      title:
        "夢はひそかに(ディズニー「シンデレラ」より Dream Is a Wish Your Heart Makes 洋楽 Disney)",
      info: "洋楽 Disney",
      filename: "夢はひそかに",
    },
    {
      title:
        "シューベルトの子守歌(ねむれねむらははのむねに クラシック こもりうた)",
      info: "クラシック",
      filename: "シューベルトの子守歌",
    },
    {
      title:
        "シューベルトのアヴェ・マリア クラシック クリスマス アベマリア ラ・ノビア",
      info: "クラシック クリスマス アベマリア",
      filename: "シューベルトのアヴェ・マリア",
    },
    {
      title: "菩提樹(シューベルト。いずみにそいてしげるぼだいじゅ クラシック)",
      info: "クラシック",
      filename: "菩提樹",
    },
    {
      title:
        "シューベルトのセレナーデ(Schubert Serenade(Staendchen) クラシック)",
      info: "クラシック",
      filename: "シューベルトのセレナーデ",
    },
    {
      title:
        "ます(シューベルト。きよきながれをひかりはえてますははしれり クラシック)",
      info: "クラシック",
      filename: "ます",
    },
    {
      title:
        "ストーミー・マンデー(Tボーン・ウォーカー ブルース 洋楽 T-Bone Walker Blues)",
      info: "洋楽 T-Bone Walker Blues",
      filename: "ストーミー・マンデー",
    },
    {
      title: "シューベルトの野ばら(わらべはみたりのなかのばら クラシック)",
      info: "クラシック",
      filename: "シューベルトの野ばら",
    },
    {
      title: "セサミストリートのテーマ(さーにーでい 洋楽 テレビ)",
      info: "洋楽",
      filename: "セサミストリート",
    },
    {
      title:
        "心の窓に灯火を(いじわるこがらしふきつけるふるいせーたーあぼろしゅーず 歌謡曲 ザ・ピーナッツ)",
      info: "歌謡曲 ザ・ピーナッツ",
      filename: "心の窓に灯火を",
    },
    {
      title:
        "南から南から(みなみからみなみからとんできたきたわたりどり 軍歌・戦時歌謡 三原純子)",
      info: "軍歌・戦時歌謡 三原純子",
      filename: "南から南から",
    },
    {
      title:
        "黒ネコのタンゴ(きみはかわいいぼくのくろねこあかいりぼんがよくにあうよ 童謡・唱歌)",
      info: "童謡・唱歌",
      filename: "黒ネコのタンゴ",
    },
    {
      title:
        "満州娘(わたしじゅうろくまんしゅうむすめはるよさんがつゆきどけに 軍歌・戦時歌謡)",
      info: "軍歌・戦時歌謡",
      filename: "満州娘",
    },
    {
      title:
        "この広い野原いっぱい(このひろいのはらいっぱいさくはなをひとつのこらず フォーク 歌謡曲)",
      info: "フォーク 歌謡曲",
      filename: "この広い野原いっぱい",
    },
    {
      title:
        "快傑ハリマオ(かいけつはりまお。まっかなたいようもえているはてないみなみのおおぞらに 歌謡曲 テレビ 三橋美智也)",
      info: "歌謡曲 テレビ 三橋美智也",
      filename: "快傑ハリマオ",
    },
    {
      title: "麦と兵隊(じょしゅうじょしゅうとじんばはすすむ 軍歌・戦時歌謡)",
      info: "軍歌・戦時歌謡",
      filename: "麦と兵隊",
    },
    {
      title:
        "ラムのラブソング(あんまりそわそわしないであなたはいつでもきょろきょろ アニメ うる星やつら)",
      info: "アニメ うる星やつら",
      filename: "ラムのラブソング",
    },
    {
      title:
        "真っ赤な太陽(まっかにもえたたいようだからまなつのうみはこいのきせつなの 美空ひばり 歌謡曲)",
      info: "",
      filename: "真っ赤な太陽",
    },
    {
      title:
        "風(ひとはだれもただひとりたびにでてひとはだれもふるさとをふりかえる フォーク 歌謡曲 はしだのりひこ)",
      info: "",
      filename: "風",
    },
    {
      title: "勘太郎月夜唄(かげかやなぎかかんたろうさんが 歌謡曲 演歌 小畑実)",
      info: "",
      filename: "勘太郎月夜唄",
    },
    {
      title: "サーカスの唄(たびのつばくろさみしかないか 古賀政男 歌謡曲 演歌)",
      info: "",
      filename: "サーカスの唄",
    },
    {
      title:
        "矢切の渡し(つれてにげてよついておいでよゆうぐれのあめががふる ちあきなおみ 歌謡曲 演歌)",
      info: "",
      filename: "矢切の渡し",
    },
    {
      title: "ハバロフスク小唄(軍歌・戦時歌謡)",
      info: "",
      filename: "ハバロフスク小唄",
    },
    {
      title:
        "高原列車は行く(きしゃのまどからはんけちふれば 歌謡曲 岡本敦郎 古関裕而)",
      info: "",
      filename: "高原列車は行く",
    },
    {
      title:
        "カチューシャの唄(かちゅーしゃかわいやわかれのつらさ 歌謡曲 松井須磨子)",
      info: "",
      filename: "カチューシャの唄",
    },
    {
      title: "カチューシャ(りんごのはなほころび ロシア)",
      info: "",
      filename: "カチューシャ",
    },
    {
      title:
        "赤鼻のトナカイ(Rudolph the Red-Nosed Reindeer、まっかなおはなの。クリスマス)",
      info: "",
      filename: "赤鼻のトナカイ",
    },
    {
      title: "ぶんぶんぶん(ぶんぶんぶんはちがとぶ 童謡・唱歌 ボヘミア 洋楽)",
      info: "",
      filename: "ぶんぶんぶん",
    },
    {
      title:
        "愛国の花(ましろきふじのけだかさを 軍歌・戦時歌謡 古関裕而 渡辺はま子)",
      info: "",
      filename: "愛国の花",
    },
    {
      title: "露営の歌(かってくるぞといさましく 古関裕而 軍歌・戦時歌謡)",
      info: "",
      filename: "露営の歌",
    },
    {
      title:
        "お座敷小唄(ふじのたかねにふるゆきもきょうとぽんとちょうにふるゆきも 歌謡曲 和田弘とマヒナスターズ)",
      info: "",
      filename: "お座敷小唄",
    },
    {
      title:
        "翼をください(いまわたしのねがいごとがかなうならば フォーク 歌謡曲 赤い鳥)",
      info: "",
      filename: "翼をください",
    },
    {
      title:
        "めえめえこやぎ(めえめえもりのこやぎこやぎはしればこいしにあたる 本居長世 児山羊 童謡・唱歌)",
      info: "",
      filename: "めえめえこやぎ",
    },
    {
      title: "十五夜お月さん(じゅうごやおつきさん 童謡・唱歌)",
      info: "",
      filename: "十五夜お月さん",
    },
    {
      title:
        "お山の杉の子(むかしむかしそのむかししいのきばやしのすぐそばに 童謡・唱歌 軍歌・戦時歌謡)",
      info: "",
      filename: "お山の杉の子",
    },
    {
      title:
        "狼なんかこわくない(Who's Afraid of the Big Bad Wolf ディズニー 洋楽 Disney おおかみ 三匹の子豚)",
      info: "",
      filename: "狼なんかこわくない",
    },
    {
      title:
        "故郷を離るる歌(そののさゆりなでしこかきねのちぐさ ドイツ 童謡・唱歌)",
      info: "",
      filename: "故郷を離るる歌",
    },
    {
      title: "大きな栗の木の下で(おおきなくりのきのしたで 童謡・唱歌 イギリス)",
      info: "",
      filename: "大きな栗の木の下で",
    },
    {
      title: "茶摘み(ちゃつみ。なつもちかづくはちじゅうはちや 童謡・唱歌)",
      info: "",
      filename: "茶摘み",
    },
    {
      title:
        "蘇州夜曲(きみがみむねにだかれてきくは 服部良一 1940 軍歌・戦時歌謡 映画)",
      info: "",
      filename: "蘇州夜曲",
    },
    {
      title:
        "森のくまさん(あるひもりのなかくまさんにであった 童謡・唱歌 アメリカ スカウト)",
      info: "",
      filename: "森のくまさん",
    },
    {
      title:
        "二宮金次郎(しばかりなわないわらじをつくりおやのてをすけ 童謡・唱歌)",
      info: "",
      filename: "二宮金次郎",
    },
    {
      title: "富士山(あたまをくものうえにだししほうの 童謡・唱歌)",
      info: "",
      filename: "富士山",
    },
    {
      title: "海(まつばらとおくみゆるところしらほのかげはうかぶ 童謡・唱歌)",
      info: "",
      filename: "海(松原遠く)",
    },
    {
      title: "海(うみはひろいなおおきいなつきがのぼるしひがしずむ 童謡・唱歌)",
      info: "",
      filename: "海(海は広いな)",
    },
    {
      title:
        "チロルの子守歌(すずのひびきとおくやまのまきばくれて 童謡・唱歌 Austria Tirol Tyrol こもりうた)",
      info: "",
      filename: "チロルの子守歌",
    },
    {
      title: "軍艦マーチ(まもるもせむるもくろがねの 軍歌・戦時歌謡 軍艦行進曲)",
      info: "",
      filename: "軍艦マーチ",
    },
    {
      title: "ペチカ(ゆきのふるよはたのしいぺちか 童謡・唱歌)",
      info: "",
      filename: "ペチカ",
    },
    {
      title:
        "銀座カンカン娘(あのこかわいやかんかんむすめ 歌謡曲 服部良一 高峰秀子 笠置シヅ子)",
      info: "",
      filename: "銀座カンカン娘",
    },
    {
      title:
        "中国地方の子守唄(ねんねこさっしゃりませねたこのかわいさ 童謡・唱歌 こもりうた)",
      info: "",
      filename: "中国地方の子守唄",
    },
    {
      title:
        "五木の子守唄(おどまぼんぎりぼんぎりぼんからさきゃおらんど 童謡・唱歌 こもりうた)",
      info: "",
      filename: "五木の子守唄",
    },
    {
      title:
        "ジョスランの子守歌(Berceuse de Jocelyn クラシック Godard フランス こもりうた)",
      info: "",
      filename: "ジョスランの子守歌",
    },
    {
      title: "バードランドの子守唄(Lullaby of Birdland ジャズ jazz こもりうた)",
      info: "",
      filename: "バードランドの子守唄",
    },
    {
      title: "江戸の子守唄(ねんねんころりよおころりよ 童謡・唱歌 こもりうた)",
      info: "",
      filename: "江戸の子守唄",
    },
    {
      title:
        "島原の子守唄(おどみゃしまばらのなしのきそだちよ 童謡・唱歌 こもりうた)",
      info: "",
      filename: "島原の子守唄",
    },
    {
      title:
        "モーツァルトの子守歌(ねむれよいこよにわやまきばに クラシック 童謡・唱歌 こもりうた)",
      info: "",
      filename: "モーツァルトの子守歌",
    },
    {
      title:
        "コサックの子守歌(ねむれやこさっくのいとしごよ 童謡・唱歌 ロシア こもりうた)",
      info: "",
      filename: "コサックの子守歌",
    },
    {
      title: "ブラームスの子守歌(ねむれよあこ クラシック こもりうた)",
      info: "",
      filename: "ブラームスの子守歌",
    },
    {
      title: "メリーさんの羊(めりーさんのひつじ 童謡・唱歌 洋楽)",
      info: "",
      filename: "メリーさんの羊",
    },
    {
      title: "旅笠道中(よるがつめたいこころがさむい 歌謡曲 1935 東海林太郎)",
      info: "",
      filename: "旅笠道中",
    },
    {
      title:
        "揺籃のうた(ゆりかごのうたをかなりやがうたうよねんねこ 童謡・唱歌)",
      info: "",
      filename: "揺籃のうた",
    },
    {
      title:
        "カントリー・ロード(ジョン・デンバー 故郷へ帰りたい Take Me Home, Country Roads 洋楽 1971)",
      info: "",
      filename: "カントリー・ロード",
    },
    {
      title:
        "汽車(いまはやまなかいまははまいまはてっきょうわたるぞと 童謡・唱歌)",
      info: "",
      filename: "汽車",
    },
    {
      title: "汽車ポッポ(きしゃきしゃぽっぽぽっぽしゅっぽしゅっぽ 童謡・唱歌)",
      info: "",
      filename: "汽車ポッポ",
    },
    {
      title:
        "南国土佐を後にして(なんごくとさをあとにして 1953 歌謡曲 ペギー葉山カバー 1959)",
      info: "",
      filename: "南国土佐を後にして",
    },
    {
      title:
        "サンタ・ルチア(ほしかげしろくうみをてらし 洋楽 童謡・唱歌 イタリア ナポリ 1849)",
      info: "",
      filename: "サンタ・ルチア",
    },
    {
      title:
        "からすの赤ちゃん(からすのあかちゃんなぜなくのこけこっこのおばさんに 童謡・唱歌)",
      info: "",
      filename: "からすの赤ちゃん",
    },
    {
      title:
        "箱根八里(はこねのやまはてんかのけんかんこくかんもものならず 童謡・唱歌 滝廉太郎 1901)",
      info: "",
      filename: "箱根八里",
    },
    {
      title: "どじょっこふなっこ(はるになればすがこもとけて 童謡・唱歌)",
      info: "",
      filename: "どじょっこふなっこ",
    },
    {
      title:
        "桃太郎(ももたろさんももたろさんおこしにつけたきびだんご 童謡・唱歌)",
      info: "",
      filename: "桃太郎",
    },
    {
      title:
        "はなさかじじい(うらのはたけでぽちがなくしょうじきじいさんほったれば 童謡・唱歌)",
      info: "",
      filename: "はなさかじじい",
    },
    {
      title:
        "証城寺の狸囃子(しょしょしょうじょうじしょうじょうじのにわは 童謡・唱歌)",
      info: "",
      filename: "証城寺の狸囃子",
    },
    {
      title: "かたつむり(でんでんむしむし 童謡・唱歌)",
      info: "",
      filename: "かたつむり",
    },
    {
      title:
        "うさぎとかめ(もしもしかめよかめさんよせかいのうちにおまえほど 童謡・唱歌)",
      info: "",
      filename: "うさぎとかめ",
    },
    {
      title:
        "かごめかごめ(かごめかごめかごのなかのとりはいついつでやる 童謡・唱歌)",
      info: "",
      filename: "かごめかごめ",
    },
    {
      title: "こいのぼり(やねよりたかい 童謡・唱歌)",
      info: "",
      filename: "こいのぼり",
    },
    {
      title: "鯉のぼり(いらかのなみとくものなみ 童謡・唱歌)",
      info: "",
      filename: "鯉のぼり",
    },
    {
      title: "田植え(そろたでそろたさなえがそろた 童謡・唱歌)",
      info: "",
      filename: "田植え",
    },
    {
      title: "竹田の子守唄(もりもいやがるぼんからさきにゃ 童謡・唱歌 フォーク)",
      info: "",
      filename: "竹田の子守唄",
    },
    {
      title:
        "夕焼けとんび(ゆうやけぞらがまっかっかとんびがぐるりとわをかいた 歌謡曲 三橋美智也 1958)",
      info: "",
      filename: "夕焼けとんび",
    },
    {
      title: "鞠と殿様(てんてんてんまりてんてまり 童謡・唱歌)",
      info: "",
      filename: "鞠と殿様",
    },
    {
      title: "一月一日(いちがついちじつ、としのはじめのためしとて 童謡・唱歌)",
      info: "",
      filename: "一月一日",
    },
    {
      title: "荒城の月(はるこうろうのはなのえん 童謡・唱歌 滝廉太郎 1901)",
      info: "",
      filename: "荒城の月",
    },
    {
      title: "船頭小唄(おれはかわらのかれすすき 歌謡曲 1921)",
      info: "",
      filename: "船頭小唄",
    },
    {
      title: "船頭さん(むらのわたしのせんどさんは 童謡・唱歌 軍歌・戦時歌謡)",
      info: "",
      filename: "船頭さん",
    },
    {
      title:
        "ちょうちょう(ちょうちょうちょうちょうなのはにとまれ 童謡・唱歌 ドイツ)",
      info: "",
      filename: "ちょうちょう",
    },
  ];

  const [musicData, setMusicData] = useState<MusicData[]>(initialData);
  const [music, setMusic] = useState<MusicData>({
    title: "",
    info: "",
    filename: "",
  });

  const [showList, setShowList] = useState(true);

  function shuffleList(list: MusicData[]) {
    return list
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  useEffect(() => {
    setMusicData(shuffleList(musicData));
  }, []);

  const handleShowMusic = (index: number) => {
    const selectedMusic = musicData[index];
    setMusic(selectedMusic);
    setShowList(false);
  };

  const linecolor = (index: number): string => {
    return index % 2 === 0 ? "lime" : "skyblue";
  };

  return (
    <div className="text-3xl">
      {showList ? (
        <ul>
          {musicData.map((music, index) => (
            <p
              className="ml-2"
              // className="flex flex-row justify-between"
              // className="mx-auto w-[800px] flex flex-row "
              key={index}
              onClick={() => handleShowMusic(index)}
              style={{ background: linecolor(index), cursor: "pointer" }}
            >
              {music.title}
              {/* <button className="bg-red-300 bg-opacity-30  w-36">
                Show Music
              </button> */}
              {/* <button style={{ float: "right" }}>Show Music</button> */}
            </p>
          ))}
        </ul>
      ) : (
        <div className="">
          <div className="flex flex-row justify-between">
            <div className="text-xl">{music.title}</div>
            <div className="">
              <audio
                src={`${BASE_PATH}/${music.filename}.mp3`}
                controls
              ></audio>
            </div>
          </div>
          <div>
            <Image
              src={`${BASE_PATH}/${music.filename}.svg`}
              alt="music sheet"
              width={4000}
              height={100}
            />
          </div>
        </div>
      )}
    </div>
  );
}
