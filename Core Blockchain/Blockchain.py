import hashlib

def hash_Generator(data):
    result = hashlib.sha256(data.encode())
    return result.hexdigest()
class Block:
    def __init__(self, data, hash, prevHash):
        self.data=data
        self.hash=hash
        self.prevHash = prevHash
class Blockchain:
    def __init__(self):
        hashLast = hash_Generator('gen_last')
        hashStart = hash_Generator('gen_hash')

        genesis = Block('gen-data', hashStart, hashLast)
        self.chain=[genesis];
    def addBlock(self, data):
        prevHash = self.chain[-1].prevHash