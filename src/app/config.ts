import { Twitch, Youtube } from '@/domains/teams';
import { AppConfig } from './types';

const config: AppConfig = {
    event: {
        name: 'K-STAR 2024'
    },
    teams: [
        {
            name: 'Japanese A',
            players: [
                Twitch('てつはと', 'tetuhatoch810'),
                Twitch('とまる', 'tzero_obake'),
                Youtube('鹿角ほたる', '@hotaru_kazuno'),
                Twitch('ねぎとろっくす', 'negitoro__22'),
                Twitch('ポカ', 'poka_rta'),
                Twitch('たね', 'tanepota'),
                Youtube('ビルポン', '@birupon_gamejikkyo'),
                Twitch('ミスターセントーン', 'mister_senton'),
                Twitch('Tera', 'tera_kt'),
                Twitch('あまペン　ぺむ', 'pemupenguin'),
                Twitch('れもん', 'lemons_picrun'),
                Twitch('とまとまと', 'tomatomato_777'),
                Twitch('TEL', 'telpikmin'),
                Twitch('ふじくら', 'fujikura123')
            ],
        },
        {
            name: 'Japanese B',
            players: [
                Twitch('クマノミ', 'kumanomi_0326'),
                Twitch('ヤシ', 'deviyasi'),
                Twitch('きつねソーダ', 'kitsun3soda'),
                Twitch('レネイル', 'reneiru'),
                Twitch('雪化粧', 'yyyukige'),
                Twitch('4モル', 'vier_ml'),
                Twitch('せんこつ', 'sacrum_important'),
                Twitch('貯蓄', 'chochiku'),
                Twitch('きくらげ', 'k_rta'),
                Twitch('東武わさび線', 'azuminowasabi'),
                Twitch('すせるあ', 'suserua0612'),
                Twitch('たっけ', 'takke99'),
                Twitch('ティンクル・シン', 'sin_ppp'),
                Twitch('どるっぴ', 'doruppi'),
            ]
        },
        {
            name: 'Japanese C',
            players: [
                Twitch('とときゃん', 'chiee_candy'),
                Twitch('やむきゅ〜', 'yamukyu869'),
                Twitch('みりい', 'miririi6'),
                Twitch('タッキー', 'tac_key'),
                Twitch('ティリー', 'tilly_918'),
                Twitch('ミッド', 'mid_kun'),
                Twitch('テンク', 'te_nk'),
                Twitch('空ネコ', 'soraneko117'),
                Twitch('おむぎ', 'omugino'),
                Twitch('リコピン', 'rycopin32'),
                Twitch('よし', 'yoshi00396'),
                Twitch('ykrin', 'ykrin'),
                Twitch('天雪', 'tenkuooyuki'),
                Twitch('Cma', 'cma2819'),
            ]
        },
        {
            name: 'Western A',
            players: [
                Twitch('DarkRiolu', 'Darkriolu27'),
                Twitch('Nippo', 'nippo4512'),
                Twitch('Geo', 'probablygeo'),
                Twitch('Sawney', 'sawneyrath11'),
                Twitch('AbelSR', 'AbelSR_'),
                Twitch('Aston', 'glitchaston'),
                Twitch('Mr_Shasta', 'Mr_Shasta'),
                Twitch('r0bd0g', 'r0bd0g'),
                Twitch('Thomas', 'degenmode'),
                Twitch('Klaire', 'klaire_fluffle'),
                Twitch('Noops', 'AQ_Noops'),
                Twitch('Kaug', 'kaugdx'),
                Twitch('Bees', 'supportgaybees'),
                Twitch('Curtissimo', 'curtissimo41'),
            ]
        },
        {
            name: 'Western B',
            players: [
                Twitch('Moxie', 'moxieclaws'),
                Twitch('Turtle', 'turtlerta'),
                Twitch('SoapAgent', 'SoapAgent'),
                Twitch('SK', 'swordsmankirby'),
                Twitch('Elfilins', 'astersatelier'),
                Twitch('MantaPlant', 'mantaplant'),
                Twitch('MrManGuy', 'mrmanguyperson1'),
                Twitch('Marche', 'marche9th'),
                Twitch('CorvusScribe', 'corvusscribe'),
                Twitch('Sol', 'beamqueensol'),
                Twitch('Hybrid', 'pro_hybrid'),
                Twitch('Bombhappy', 'bombhappy'),
                Twitch('drcKAR', 'drckargaming'),
                Twitch('Grample', 'graample'),
            ]
        }
    ],
}

export default config;