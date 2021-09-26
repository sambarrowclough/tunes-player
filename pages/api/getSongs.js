const Web3 = require('web3')
import { supabase } from '@/utils/supabase'
let web3 = new Web3()
web3.eth.Contract.setProvider(
  'https://mainnet.infura.io/v3/1971ca31434444698172d1ef943bef37'
)
let c = new web3.eth.Contract(
  [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'tunesOfficialAddress',
          type: 'address'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address'
        },
        { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' }
      ],
      name: 'ApprovalForAll',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      inputs: [],
      name: 'ROYALTY_PCT',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'artistOf',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'audioTrackURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'coverArtURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'freezeAudioTrackURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'freezeCoverArtURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'freezeRoyaltyPercent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'freeze_cover_art_uri',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'freeze_royalty_pct',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'operator', type: 'address' }
      ],
      name: 'isApprovedForAll',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'isFrozenAudioTrackURI',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'isOriginal',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'pure',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'string', name: 'track_name', type: 'string' },
        { internalType: 'string', name: 'audio_uri', type: 'string' },
        { internalType: 'uint256', name: 'tune_token_id', type: 'uint256' }
      ],
      name: 'mintOriginalTrack',
      outputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'string', name: 'track_name', type: 'string' },
        { internalType: 'string', name: 'audio_uri', type: 'string' },
        { internalType: 'uint256', name: 'tune_token_id', type: 'uint256' }
      ],
      name: 'mintRemixTrack',
      outputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'minterOf',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
        { internalType: 'uint256', name: '_salePrice', type: 'uint256' }
      ],
      name: 'royaltyInfo',
      outputs: [
        { internalType: 'address', name: 'Receiver', type: 'address' },
        { internalType: 'uint256', name: 'royaltyAmount', type: 'uint256' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'from', type: 'address' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'from', type: 'address' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'bytes', name: '_data', type: 'bytes' }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'operator', type: 'address' },
        { internalType: 'bool', name: 'approved', type: 'bool' }
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'artist', type: 'address' },
        { internalType: 'uint256', name: 'token_id', type: 'uint256' }
      ],
      name: 'setArtist',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'token_id', type: 'uint256' },
        { internalType: 'string', name: 'audio_uri', type: 'string' }
      ],
      name: 'setAudioTrackURI',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'string', name: 'uri', type: 'string' }],
      name: 'setCoverArtURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint8', name: 'percent', type: 'uint8' }],
      name: 'setGlobalRoyaltyPercent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalOriginalTracks',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalRemixTracks',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'from', type: 'address' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'token_id', type: 'uint256' }],
      name: 'tuneTokenId',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'tunes',
      outputs: [
        {
          internalType: 'contract IERC721Enumerable',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ],
  '0x60d08DBDEd0bf56d21977b597793e69D1C5456e0'
)

const getSong = async id => {
  let b = await c.methods.tokenURI(id).call()

  //console.log(b)
  b = b.replace('data:application/json;base64,', '')
  b = JSON.parse(new Buffer(b, 'base64'))
  url = b.animation_url.replace('ipfs://', '')
  burl = 'https://ipfs.io/ipfs/' + url
  b.url = burl
  return b
}

module.exports = async (req, res) => {
  try {
    let a = await fetch(
      'https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=songs-for-tunes'
    ).then(r => r.json())
    let ids = a.assets.map(x => x.token_id)
    let songs = await Promise.all(ids.map(id => getSong(id)))
    songs = songs.map((x, i) => {
      return {
        name: x.name,
        id: x.tune_token_id,
        cover:
          'https://ipfs.io/ipfs/Qmcu552EPV98N9vi96sGN72XJCeBF4n7jC5XtA1h3HF5kC/' +
          x.tune_token_id +
          '-composite.png',
        audio: x.url,
        active: i === 0 ? true : false,
        color: ['#205950', '#2ab3bf']
      }
    })
    const { error, data } = await supabase.from('plays').select('*')
    songs = songs.map(song => {
      song.plays = data.filter(x => x.songId == song.id).length
      return song
    })
    console.log(songs)

    res.json(songs)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
