npx shadcn@latest add card 
npx shadcn@latest add card-content
npx shadcn@latest add card-description
npx shadcn@latest add card-footer
npx shadcn@latest add card-header
npx shadcn@latest add card-title
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add select-content
npx shadcn@latest add select-item
npx shadcn@latest add select-trigger


kfEoe79diLvyQItt
cleopat2li


# save to /workspaces/CleoPres 
wget https://downloads.mongodb.com/compass/mongodb-mongosh_2.4.2_amd64.deb -P /workspaces/CleoPres

# 1. Install mongosh
sudo dpkg -i /workspaces/CleoPres/mongodb-mongosh_2.4.2_amd64.deb
# default path: /usr/bin/mongosh
# 2.
# Add <your mongosh's download directory>/bin to your $PATH variable. How to
PATH="/usr/bin/mongosh:$PATH"
mongosh "mongodb+srv://cluster0.xpq7e.mongodb.net/" --apiVersion 1 --username cleopat2li
# promtped for password, so do it here
printf "%s" "kfEoe79diLvyQItt" | mongosh "mongodb+srv://cluster0.xpq7e.mongodb.net/" --apiVersion 1 --username cleopat2li

# New
# const credentials = '<path_to_certificate>'
# const client = new MongoClient('mongodb+srv://cluster0.xpq7e.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0', {
# /workspaces/CleoPres/certificate.pem
# connect to it using mongosh
mongosh "mongodb+srv://cluster0.xpq7e.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0" --apiVersion 1 --username cleopat2li --tls --tlsCAFile /workspaces/CleoPres/X509-cert-6833450600581208000.pem
# use the password
print "%s" "kfEoe79diLvyQItt" | mongosh "mongodb+srv://cluster0.xpq7e.mongodb.net/?authSource=%24external" --apiVersion 1 --username cleopat2li 

# in mongosh shell, show all available databases
# show dbs
# Show all collections in a database
# use <database_name>


# Target setup these 2 from env variables: 
#     MONGODB_DB=presidentDB
#     MONGODB_COLLECTION=presidentSub
# in Mongosh
# delete all current collection
db.dropDatabase()

# create a database name presidentDB
use presidentDB
# show db again
show dbs
# delete all current collection
db.dropDatabase()
# create a collection name presidentSub
db.createCollection("presidentSub")
# show collections
show collections
# show all inside the collection presidentSub
db.presidentSub.find()
# insert a document
# db.presidentSub.insertOne({name: "George Washington", party: "None", term: "1789-1797"})
# try again
db.presidentSub.find()
# now insert this into db: /workspaces/CleoPres/Brainvote_subs.csv

# Result:
#     presidentDB> db.presidentSub.find()
#     [
#     {
#         _id: ObjectId('67d3d8f7e04da915ed51e992'),
#         studentID: 'studentID',
#         name: 'name',
#         chineseName: 'chineseName',
#         subjectID: 'subjectID'
#     },
#     {
#         _id: ObjectId('67d3d8f7e04da915ed51e993'),
#         studentID: 'mc46619',
#         name: 'Han Shixu',
#         chineseName: '韩诗絮',
#         subjectID: '1003'




# TODO: after create everything, submit a form, test to print out from mongosh

# TODO: Fix all pages, submit a form, test to print out


# Option 2: Use local MongoDB
docker run -d -p 27017:27017 --name mongodb mongo
# connect to the container with mongo shell
docker exec -it mongodb mongosh











#     db.presidentSub.insertOne({studentID: "mc46619@um.edu.mo", name: "Han Shixu", chineseName: "韩诗絮", subjectID: "1003"})
#     db.presidentSub.insertOne({studentID: "mpu1234@um.edu.mo", name: "Ding Xi", chineseName: "丁溪", subjectID: "1004"})
#     db.presidentSub.insertOne({studentID: "ac20237@um.edu.mo", name: "Zhang Linxin", chineseName: "张林歆", subjectID: "1005"})
#     db.presidentSub.insertOne({studentID: "mc46439@um.edu.mo", name: "Liang Zixin", chineseName: "梁梓鑫", subjectID: "1006"})
#     db.presidentSub.insertOne({studentID: "mc45313@um.edu.mo", name: "Xu Wenwei", chineseName: "许文蔚", subjectID: "1007"})
#     db.presidentSub.insertOne({studentID: "mc46403@um.edu.mo", name: "Yu Xiaolin", chineseName: "余晓林", subjectID: "1008"})
#     db.presidentSub.insertOne({studentID: "mc45347@um.edu.mo", name: "Yang Kaipeng", chineseName: "杨凯鹏", subjectID: "1009"})
#     db.presidentSub.insertOne({studentID: "mc45906@um.edu.mo", name: "Yang Minqian", chineseName: "杨敏蒨", subjectID: "1010"})
#     db.presidentSub.insertOne({studentID: "mc46628@um.edu.mo", name: "Qin Hao", chineseName: "秦浩", subjectID: "1011"})
#     db.presidentSub.insertOne({studentID: "sc22455@um.edu.mo", name: "Wang Siwei", chineseName: "王四维 ", subjectID: "1012"})
#     db.presidentSub.insertOne({studentID: "dc32734@um.edu.mo", name: "Hong Ziyan", chineseName: "洪子衍", subjectID: "1013"})
#     db.presidentSub.insertOne({studentID: "mc43961@um.edu.mo", name: "Sun Huixian", chineseName: "孙卉娴", subjectID: "1014"})
#     db.presidentSub.insertOne({studentID: "mc45400@um.edu.mo", name: "Wang Liang", chineseName: "王亮", subjectID: "1015"})
#     db.presidentSub.insertOne({studentID: "sc22423@um.edu.mo", name: "Li Qingtong", chineseName: "Murphy", subjectID: "1016"})
#     db.presidentSub.insertOne({studentID: "yc48629@um.edu.mo", name: "Li Yin", chineseName: "李茵", subjectID: "1017"})
#     db.presidentSub.insertOne({studentID: "mc45131@um.edu.mo", name: "Zhang Hongyu", chineseName: "张鸿宇", subjectID: "1018"})
#     db.presidentSub.insertOne({studentID: "mc46700@um.edu.mo", name: "Wu Meihui", chineseName: "吴美慧", subjectID: "1019"})
#     db.presidentSub.insertOne({studentID: "mc36435@um.edu.mo", name: "Chen Jielu", chineseName: "陈洁露", subjectID: "1020"})
#     db.presidentSub.insertOne({studentID: "mc46417@um.edu.mo", name: "Hu Jingfa", chineseName: "胡靖发", subjectID: "1021"})
#     db.presidentSub.insertOne({studentID: "mc46401@um.edu.mo", name: "Zhang Guanghan", chineseName: "张广翰", subjectID: "1022"})
#     db.presidentSub.insertOne({studentID: "yc47701@um.edu.mo", name: "Kuang Yutong", chineseName: "况雨桐", subjectID: "1023"})
#     db.presidentSub.insertOne({studentID: "mc43309@um.edu.mo", name: "Pei Qingyang", chineseName: "裴青阳", subjectID: "1024"})
#     db.presidentSub.insertOne({studentID: "mc46665@um.edu.mo", name: "Yang Wenqi", chineseName: "杨雯淇", subjectID: "1025"})
#     db.presidentSub.insertOne({studentID: "mc46467@um.edu.mo", name: "Sha Siyuan", chineseName: "沙思源", subjectID: "1026"})
#     db.presidentSub.insertOne({studentID: "mc46679@um.edu.mo", name: "Liang Xuewei", chineseName: "梁雪薇", subjectID: "1027"})
#     db.presidentSub.insertOne({studentID: "mc44788@um.edu.mo", name: "Lu Jiayu", chineseName: "陆嘉宇", subjectID: "1028"})
#     db.presidentSub.insertOne({studentID: "mc46424@um.edu.mo", name: "Mei Xinyi", chineseName: "梅心怡", subjectID: "1029"})
#     db.presidentSub.insertOne({studentID: "mc45825@um.edu.mo", name: "Mo Zhiwen", chineseName: "莫智文", subjectID: "1030"})
#     db.presidentSub.insertOne({studentID: "mc46662@um.edu.mo", name: "Li Liting", chineseName: "李丽婷", subjectID: "1031"})
#     db.presidentSub.insertOne({studentID: "mc46432@um.edu.mo", name: "Ying Yupeng", chineseName: "应于鹏", subjectID: "1032"})
#     db.presidentSub.insertOne({studentID: "mc46656@um.edu.mo", name: "Liu Ke", chineseName: "刘珂", subjectID: "1033"})
#     db.presidentSub.insertOne({studentID: "mc46717@um.edu.mo", name: "Zhu Li", chineseName: "朱莉", subjectID: "1034"})
#     db.presidentSub.insertOne({studentID: "yc47234@um.edu.mo", name: "Xiao Pei", chineseName: "肖佩", subjectID: "1035"})
#     db.presidentSub.insertOne({studentID: "mc43360@um.edu.mo", name: "Zhu Siqi", chineseName: "朱斯祺", subjectID: "1036"})
#     db.presidentSub.insertOne({studentID: "mc44819@um.edu.mo", name: "Liang Yuxin", chineseName: "梁宇馨", subjectID: "1037"})
#     db.presidentSub.insertOne({studentID: "yc48626@um.edu.mo", name: "Liu Qiqi", chineseName: "刘芪岐", subjectID: "1038"})
#     db.presidentSub.insertOne({studentID: "must123@um.edu.mo", name: "Song Yang", chineseName: "宋杨", subjectID: "1039"})
#     db.presidentSub.insertOne({studentID: "mc25110@um.edu.mo", name: "Zhu Minhao", chineseName: "朱旻昊", subjectID: "1040"})