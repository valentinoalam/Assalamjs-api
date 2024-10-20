
const getQuran = async () => {
    const quranUrl = new URL("https://quran-api.santrikoding.com/api/surah/")
    const quran = []
    for(let i = 1; i <= 114; i++) {
        try {
            const response = await fetch(quranUrl + i)
            if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()
            quran.push(data)
            fs.writeFile(`database/data/surah-${i}.json`, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                console.error('Error writing data to file', err);
                }
            });
            console.log(`surah-${i} fetched and written successfully`);
        } catch (error) {
            if(error.message === 'HTTP error: 403')
            return {
                error: '403',
                message: 'Forbidden'
            }
            else console.error(`Could not get talks: ${error.message}`)
        }
    }
    fs.writeFile(`database/data/quran.json`, JSON.stringify(quran, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to file', err);
        }
    });
    return console.log('Al-Quran written successfully');

}
const getQuranIndex = async () => {
    const quranUrl = new URL("https://quranenc.com/api/v1/translation/sura/indonesian_complex/")
    const quran = []
    for(let i = 1; i <= 114; i++) {
        try {
            const response = await fetch(quranUrl + i)
            if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()
            quran.push(data)
        } catch (error) {
            if(error.message === 'HTTP error: 403')
            return {
                error: '403',
                message: 'Forbidden'
            }
            else console.error(`Could not get talks: ${error.message}`)
        }
    }
    fs.writeFile(`database/data/quran2.json`, JSON.stringify(quran, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to file', err);
        }
    });
    return console.log('Al-Quran written successfully');

}
const rewriteQuran = async () => {
    const data = await fs.promises.readFile('database/data/quran_index.json', 'utf8');
    const mainQuran = JSON.parse(data);

    const data2 = await fs.promises.readFile('database/data/quran_index2.json', 'utf8');
    const otherQuran = JSON.parse(data2);
    const quran = []
    for(let i = 0; i < 114; i++) {
        const {nomor,nama, nama_latin, jumlah_ayat, tempat_turun, arti, deskripsi} = mainQuran[i]
        const newEntry = {
            nomor,
            nama,
            nama_panjang : otherQuran[i].data.name_long,
            nama_latin,
            lafal_nama: otherQuran[i].data.name_en,
            arti,
            translation : otherQuran[i].data.translation_en,
            tempat_turun,
            dikotonomi : otherQuran[i].data.revelation,
            dikotonomi_latin : otherQuran[i].data.revelation_id,
            tafsir : deskripsi,
            jumlah_ayat,
            audio_url : otherQuran[i].audio_url
        }
        // mainQuran[i].lafal_nama = otherQuran[i].data.name_en
        // mainQuran[i].nama_panjang = otherQuran[i].data.name_long
        // mainQuran[i].dikotonomi = otherQuran[i].data.revelation
        // mainQuran[i].dikotonomi_latin = otherQuran[i].data.revelation_id
        // mainQuran[i].translation = otherQuran[i].data.translation_en
        // mainQuran[i].audio = otherQuran[i].data.audio_url
        quran.push(newEntry)
    }
    fs.writeFile(`database/data/quran_index00.json`, JSON.stringify(quran, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to file', err);
        }
    });
    return console.log('Al-Quran written successfully');

}
const tambahAyat = async () => {
    const data = await fs.promises.readFile('database/data/quran_index.json', 'utf8');
    const mainQuran = JSON.parse(data);

    const data2 = await fs.promises.readFile('database/data/quran.json', 'utf8');
    const otherQuran = JSON.parse(data2);
    for(let i = 0; i < 114; i++) {
        mainQuran[i].ayat = otherQuran[i].ayat
    }
    fs.writeFile(`database/data/AlQuran.json`, JSON.stringify(mainQuran, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to file', err);
        }
    });
    return console.log('Al-Quran written successfully');

}
const tambahTranlasi = async () => {
    const data = await fs.promises.readFile('database/data/AlQuran.json', 'utf8');
    const mainQuran = JSON.parse(data);

    const data2 = await fs.promises.readFile('database/data/quran2.json', 'utf8');
    const otherQuran = JSON.parse(data2);
    for(let i = 0; i < 114; i++) {
        for(let j = 0; j < mainQuran[i].jumlah_ayat; j++){
            mainQuran[i].ayat[j].terjemahan = otherQuran[i].result[j].translation
            mainQuran[i].ayat[j].catatan_kaki = otherQuran[i].result[j].footnotes
        }
    }
    fs.writeFile(`database/data/AlQuran1.json`, JSON.stringify(mainQuran, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to file', err);
        }
    });
    return console.log('Al-Quran written successfully');

}
const tambahAudio = async () => {
    const file = await fs.promises.readFile('database/data/AlQuran.json', 'utf8');
    const mainQuran = JSON.parse(file);
    const quranUrl = new URL("https://api.myquran.com/v2/quran/ayat/")
    for(let i = 0; i < 114; i++) {
        for(let j = 0; j < mainQuran[i].jumlah_ayat; j++){
            const response = await fetch(quranUrl + `${i+1}/${j+1}`)
            if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
            }
            const {data} = await response.json()
            console.log(i + ' ' + j)
            mainQuran[i].ayat[j].hal = data[0].page
            mainQuran[i].ayat[j].juz = data[0].juz
            mainQuran[i].ayat[j].audio_url = data[0].audio
        }
    }
    fs.writeFile(`database/data/AlQuran1.json`, JSON.stringify(mainQuran, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to file', err);
        }
    });
    return console.log('Al-Quran written successfully');

}
const tambahAudioLagi = async () => {
    const data = await fs.promises.readFile('database/data/AlQuran1.json', 'utf8');
    const mainQuran = JSON.parse(data);

    const data2 = await fs.promises.readFile('database/data/quran_index2.json', 'utf8');
    const otherQuran = JSON.parse(data2);
    for(let i = 0; i < 114; i++) {
        mainQuran[i].audio_url = otherQuran[i].data.audio_url
    }
    fs.writeFile(`database/data/AlQuran.json`, JSON.stringify(mainQuran, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to file', err);
        }
    });
    return console.log('Al-Quran written successfully');

}