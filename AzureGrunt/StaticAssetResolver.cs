using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Caching;
using Newtonsoft.Json;

namespace AzureGrunt {
    public class StaticAssetResolver {
        private string assetsJsonPath;
        private Cache cache;

        private const string CACHE_KEY = "assetsJsonDictionary";

        public StaticAssetResolver(string assetsJsonPath, Cache cache) {
            this.assetsJsonPath = assetsJsonPath;
            this.cache = cache;
        }

        public string GetActualPath(string assetPath) {
            var assets = cache.Get(CACHE_KEY) as AssetCollection;
            if (assets == null) {
                assets = GetAssetsFromFile();
                cache.Insert(CACHE_KEY, assets, new CacheDependency(assetsJsonPath));
                Trace.TraceInformation("Assets cache miss");
            } else {
                Trace.TraceInformation("Assets cache hit");
            }
            return assets[assetPath];
        }

        private AssetCollection GetAssetsFromFile() {
            return JsonConvert.DeserializeObject<AssetCollection>(File.ReadAllText(assetsJsonPath));
        }
    }
}